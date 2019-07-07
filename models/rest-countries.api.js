const fetch = require('node-fetch');

module.exports.initCountriesAPI = async () => {
    return await fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => module.exports.countries = data)
}