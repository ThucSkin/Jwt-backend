import express from 'express';
import cookieParser from 'cookie-parser';
require("dotenv").config();

import configViewEngine from './config/viewEngine';
import initApiRoute from './routes/api';
import configCors from './config/cors';
import { createJWT, verifyToken } from './middleware/JWTaction';

const app = express();

//configCORS
configCors(app);

//config cookieParser
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//setup view engine
configViewEngine(app);

//init web route
initApiRoute(app);


//handle 404 Not Found
app.use((req, res) => {
    res.send('404 Not Found');
})

app.listen(PORT, () => {
    console.log(`Server chạy thành công trên cổng ${PORT}!!!`)
})