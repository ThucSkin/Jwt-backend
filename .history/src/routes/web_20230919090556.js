
const express = require('express');
const homeController = require('../controller/homeController');

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', (req, res) => {
        return res.send('Welcome');
    });

    return app.use('/', router);
}

module.exports = initWebRoute;