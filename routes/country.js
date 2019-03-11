/*
    This router will be called when the user choose the 
    country option. The restcountries API data that is used 
    here to verify the input of the user before showing the 
    events. Also, an error will be passed to the error handling 
    function in the server if the input is invalid. A chain is 
    used to promise finish fetching the data before rendering 
    the data to the pug template. The Eventful API is used here
    to fetch the events in the user's chosen country.
*/

const path = require('path');
const router = require('express').Router();
var fetch = require('node-fetch');
var _ = require('underscore');
var main = require('./main');

let countries = {};
main.promise.then(() => {
    countries = main.countries;
})

router.get('/country', (req, res) => {

    if (countries[req.query.index] == undefined) {
        res.status(400);
        next(err);
    }

    let events = new Array;
    let fetches = [];
    let url = '';
    for (let i = 1; i <= 2; i++) {
        if (countries[req.query.index].alpha2Code == "US") {
            url = `https://api.eventful.com/json/events/search?&app_key=${process.env.EVENTFUL_APPKEY}&location="United States"&page_number=${i}`;
        } else {
            url = `https://api.eventful.com/json/events/search?&app_key=${process.env.EVENTFUL_APPKEY}&location="${countries[req.query.index].name}"&page_number=${i}`;
        }
        fetches.push(fetch(url)
            .then(res => res.json())
            .then(body => {
                body.events === null ? console.log(`events are null for page: ${i}!`) : events.push(body.events.event);
            })
            .catch((error) => {
                console.log('error loading the data for: ' + error);
                res.status(500).end();
            }));
    }
    Promise.all(fetches).then(() => {
        res.render(path.join(__dirname, '../client/html/country'), {
            name: countries[req.query.index].name,
            capital: countries[req.query.index].capital,
            flag: countries[req.query.index].flag,
            alphaCode: countries[req.query.index].alpha3Code + ', ' + countries[req.query.index].alpha2Code,
            population: countries[req.query.index].population,
            languages: countries[req.query.index].languages,
            region: countries[req.query.index].region,
            subregion: countries[req.query.index].subregion,
            events: _.flatten(events)
        });
    })
});

module.exports = router;