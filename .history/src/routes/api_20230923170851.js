const homeController = require('../controller/homeController');

const express = require('express');

let router = express.Router();

const initApiRoute = (app) => {
    router.post('/api/login', homeController.handleLogin);
    router.get('/api/get-all-users', homeController.handleGetAllUser);
    router.post('/create/user', homeController.handleCreateUser);
    router.put('/api/edit-user', homeController.handleEditUser);
    router.delete('/api/delete-user', homeController.handleDeleteUser);
    router.get('/api/allcode', homeController.getAllCode);

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);

    return app.use('/', router);
}

module.exports = initApiRoute;