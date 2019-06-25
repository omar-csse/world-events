const RestCountries = require('rest-countries-node');
restCountries = new RestCountries;

module.exports.initCountriesAPI = () => {
    return restCountries.getAll().then(data => module.exports.countries = data)
}