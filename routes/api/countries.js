/*
    Rest Countries API  is used here and sent to a specific 
    router.The API data will be used in the client side once 
    the server runs. A promise is used to prevent the load of 
    the page before sending the API data to the client side.
*/

const router = require('express').Router();
const countries = require('../../models/rest-countries.api');

router.get('/api/countries', (req, res) => {
    res.json(countries.countries);
});

module.exports = router