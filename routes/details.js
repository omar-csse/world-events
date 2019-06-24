const router = require('express').Router();
const path = require('path');
const foursquare = require('../models/foursquare.api');

router.get('(/events|/country)?/details', (req, res) => {

        foursquare.getVenues(req.query.lat, req.query.long).then((venues) => {
            res.render(path.join(__dirname, '../client/html/details'), {
                venues: venues
            });
        });
});

module.exports = router;