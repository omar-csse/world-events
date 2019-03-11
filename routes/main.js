/*
    the main route (the main webpage). Rest Countries API 
    is used here and sent to a specific router.The API data 
    will be used in the client side once the server runs.
    A promise is used to prevent the load of the page before
    sending the API data to the client side.
*/

const router = require('express').Router();
const path = require('path');
var RestCountries = require('rest-countries-node');
restCountries = new RestCountries;

const promise = restCountries.getAll()
    .then(data => {
        router.get('/api/countries', (req, res) => {
            res.json(data);
        });
        module.exports.countries = data;
    })
    .then(() => console.log('countries api is ready!'));

router.get('/', (req, res) => {
    promise.then(() => {
        res.render(path.join(__dirname, '../client/html/main'));
    })
});

module.exports = {
    router: router,
    promise: promise,
}