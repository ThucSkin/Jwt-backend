import express from 'express';
import configViewEngine from './config/viewEngine';
import initApiRoute from './routes/api';
import configCors from './config/cors';
import { createJWT, verifyToken } from './middleware/JWTaction';

require("dotenv").config()

const app = express();

//configCORS
configCors(app);

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

createJWT();
let decodedData = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGh1YyIsImFnZSI6IjIxIiwiaWF0IjoxNjk2OTIzMjg3fQ.Qb2KuQTEL9KhwSX7ifoMVIdLXQzIQMEwFUIIbxFDNw4');
console.log(decodedData);


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