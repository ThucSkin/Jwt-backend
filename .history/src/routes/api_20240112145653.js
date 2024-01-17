const homeController = require('../controller/homeController');
const groupController = require('../controller/groupController');

const express = require('express');
const { checkUserJWT, checkUserPermission } = require('../middleware/JWTaction');

let router = express.Router();

const initApiRoute = (app) => {
    router.all('*', checkUserJWT, checkUserPermission);

    router.post('/login', homeController.handleLogin);

    router.get('/list/user', homeController.handleGetAllUser);
    router.post('/create/user', homeController.handleCreateUser);
    router.put('/user/update', homeController.handleEditUser);
    router.delete('/user/delete', homeController.handleDeleteUser);

    router.get('/list/group', groupController.handleGetAllGroup);

    return app.use('/', router);
}

module.exports = initApiRoute;