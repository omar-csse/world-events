const fetch = require('node-fetch');


module.exports.events = (query) => {
    
    url = `https://www.eventbriteapi.com/v3/events/search/?q=${query}&token=${process.env.EVENTBRITE_API_TOKEN}&expand=venue`;
    
    return fetch(url)
        .then(res => res.json())
        .then(body => {return body})
        .catch((error) => console.log(error))
}