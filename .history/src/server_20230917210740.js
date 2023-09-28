import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';

const app = express();

configViewEngine(app);

initWebRoutes(app);