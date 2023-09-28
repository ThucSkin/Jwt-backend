const homeController = require('../controller/homeController');

const express = require('express');

let router = express.Router();

const initApiRoute = (app) => {
    router.post('/create/user', homeController.handleCreateUser);
    router.get('/list/user', homeController.handleGetAllUser);

    return app.use('/', router);
}

module.exports = initApiRoute;