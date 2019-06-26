/*
    This router will be called when the user click 
    on the Details and near venues. The fourquare API
    is used here by using the fetch built-in function
    or promise. A chain called fetches is used to prevent
    loading the webpage before injecting the data in the 
    pug template. 
*/

const fetch = require('node-fetch');

module.exports.getVenues = async (lat, long) => {

    let venues = {};
    let url = `https://api.foursquare.com/v2/venues/search?query=restaurant,cafe&ll=${lat},${long}&client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${process.env.FOURSQUARE_CLIENT_SECRET}&v=20190101&limit=40&radius=5000`

    await fetch(url)
        .then(res => res.json())
        .then(body => {
            for (let n = 0; n < body.response.venues.length; n++) {
                venues[n] = {
                    name: body.response.venues[n].name,
                    distance: body.response.venues[n].location.distance,
                    address: body.response.venues[n].location.formattedAddress,
                    latitude: body.response.venues[n].location.lat,
                    longitude: body.response.venues[n].location.lng,
                    category: body.response.venues[n].categories[0].name,
                }
            }
        })
        .catch((error) => {
            console.log(`error loading some of the venues' data` + error);
        });

    return venues;
}

