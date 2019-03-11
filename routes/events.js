/*
    This router will be called when the user choose
    the query option. The Eventbrite API is used here. 
*/

const path = require('path');
const router = require('express').Router();
var fetch = require('node-fetch');

router.get('/events', (req, res) => {
    url = `https://www.eventbriteapi.com/v3/events/search/?q=${req.query.query}&token=${process.env.EVENTBRITE_API_TOKEN}&expand=venue`;
    fetch(url)
        .then(res => res.json())
        .then(body => {
            res.render(path.join(__dirname, '../client/html/events'), {
                query: req.query.query,
                events: body.events
            });
        })
        .catch((error) => {
            console.log('error loading some of the data for: ' + req.query.query);
            Console.log(error);
            res.status(500).end();
        });
});

module.exports = router;