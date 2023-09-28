import express from 'express';

const router = express.router();

const initWebRoutes = () => {
    router.get('/home', (req, res) => {
        {
            return res.send("hello")
        });
}