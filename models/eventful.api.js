const fetch = require('node-fetch');

module.exports.countryEvents = (countryIndex, countries) => {

    url = `https://api.eventful.com/json/events/search?&app_key=${process.env.EVENTFUL_APPKEY}&location="${countries[countryIndex].name}`

    return fetch(url)
        .then(res => res.json())
        .then(body => {return body})
        .catch((error) => console.log(error))
}