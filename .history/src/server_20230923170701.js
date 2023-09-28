import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './routes/web';
// import connecDB from './config/connectDB';
require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connecDB();

//setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);
initApiRoute(app);


//handle 404 Not Found
app.use((req, res) => {
    res.send('404 Not Found');
})

app.listen(PORT, () => {
    console.log(`Server chạy thành công trên cổng ${PORT}!!!`)
})