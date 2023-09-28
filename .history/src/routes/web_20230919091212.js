
import express from 'express';

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/home', (req, res) => {
        return res.send('Welcome');
    });

    return app.use('/', router);
}

module.exports = initWebRoute;