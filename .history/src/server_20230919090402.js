const express = require('express');
const configViewEngine = require('./configs/viewEngine');
const initWebRoute = require('./routes/web');

require('dotenv').config();


const app = express()
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);


//handle 404 Not Found
app.use((req, res) => {
    res.send('404 Not Found');
})

app.listen(port, () => {
    console.log(`Server chạy thành công trên cổng ${port}!!!`)
})