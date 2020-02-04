/*
    This file will create the server using express framework. 
    Also, join the server side with the static files using
    the express static built-in function.
*/

const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const app = express();
const countries = require('../models/rest-countries.api');

// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/')));

/*
    Define the port and the local host. 
    Set pug as the view engine 
*/

const port = 3010;
const localhost = '127.0.0.1';
app.set('view engine', 'pug');

/*
    Require the middlewares created in the routes folder.
    All the routes are seperated to keep the project organized.
*/

app.use(require('../routes/api/countries'));
app.use(require('../routes/main'));
app.use(require('../routes/events'));
app.use(require('../routes/country'));
app.use(require('../routes/details'));

/*
    Handle the forbidden as well as the not found routes.
    If an error occured in one of the APIs, the 500 error
    will be shown.
*/

app.all('/api*', (req, res, next) => {
    res.status(403);
    next(err);
});
app.get('*', function(req, res) {
    res.status(404);
    next(err);
});
app.use((err, req, res, next) => {
    res.status(res.statusCode || 500);
    res.render(path.join(__dirname, '../client/html/error'), {
        status: res.statusCode
    });
});

/*
    Create the server
*/

const main = async () => {
    await dotenv.config();
    await countries.initCountriesAPI();
    await app.listen(port);
    await console.log('countries api is ready!');
    return console.debug(`🚀  Server listening on http://${localhost}:${port}`);
}

main();