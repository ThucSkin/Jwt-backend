import express from 'express';

let router = express.router();

const initWebRoutes = () => {
    router.get('/home', (req, res) => {
        return res.send("hello home")
    });

    return app.use("/", router)
}

export default initWebRoutes;