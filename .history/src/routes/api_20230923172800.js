const homeController = require('../controller/homeController');

const express = require('express');

let router = express.Router();

const initApiRoute = (app) => {
    router.post('/create/user', homeController.handleCreateUser);

    return app.use('/', router);
}

module.exports = initApiRoute;