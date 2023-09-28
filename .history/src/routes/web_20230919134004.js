
import express from 'express';
import handlerHi from '../controller/homeController'

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', (req, res) => {

    });

    router.get('/home', (req, res) => {
        return res.send('Welcome');
    });

    return app.use('/', router);
}

module.exports = initWebRoute;