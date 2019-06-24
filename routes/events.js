/*
    This router will be called when the user choose
    the query option. The Eventbrite API is used here. 
*/

const path = require('path');
const router = require('express').Router();
const eventbrite = require('../models/eventbrite.api');

router.get('/events', (req, res) => {


    eventbrite.events(req.query.query)
        .then((data) => {
            res.render(path.join(__dirname, '../client/html/events'), {
                query: req.query.query,
                events: data.events
            });
        })
        .catch((error) => {
            console.log('error loading some of the data for: ' + req.query.query);
            Console.log(error);
            res.status(500).end();
        });

});

module.exports = router;