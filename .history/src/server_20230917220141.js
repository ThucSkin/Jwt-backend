import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';

const app = express();

configViewEngine(app);

initWebRoutes(app);

app.use((req, res) => {
    res.send('404 Not Found');
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});