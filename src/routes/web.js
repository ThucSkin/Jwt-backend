
import express from 'express';
import homeController from '../controller/homeController'

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.handlerHi);
    router.get('/users', homeController.getAllUser);
    router.post('/users/create', homeController.handleCreateUser);

    router.get('/home', (req, res) => {
        return res.send('Welcome');
    });

    return app.use('/', router);
}

module.exports = initWebRoute;