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
const eventful = require('../models/eventful.api');
const countries = require('../models/rest-countries.api');


router.post('/api/countries', (req, res) => {
    res.json(data);
});

router.get('/country', (req, res) => {

    if (countries.countries[req.query.index] == undefined) {
        res.status(400);
        next(err);
    }
    
    eventful.countryEvents(req.query.index, countries.countries)
        .then((data) => {
            res.render(path.join(__dirname, '../client/html/country'), {
                name: countries.countries[req.query.index].name,
                capital: countries.countries[req.query.index].capital,
                flag: countries.countries[req.query.index].flag,
                alphaCode: countries.countries[req.query.index].alpha3Code + ', ' + countries.countries[req.query.index].alpha2Code,
                population: countries.countries[req.query.index].population,
                languages: countries.countries[req.query.index].languages,
                region: countries.countries[req.query.index].region,
                subregion: countries.countries[req.query.index].subregion,
                events: data.events === null ? [] : data.events.event
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).end()
        })
});

module.exports = router;