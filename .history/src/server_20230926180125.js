import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './routes/web';
import initApiRoute from './routes/api';
// import connecDB from './config/connectDB';
require("dotenv").config()

const app = express();

// Middleware để xử lý CORS
app.use((req, res, next) => {
    // Cho phép tất cả các nguồn gốc (thay đổi '*' thành địa chỉ nguồn cụ thể nếu cần)
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Cho phép truy cập với thông tin xác thực (credentials)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Cho phép các phương thức yêu cầu cụ thể
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Cho phép các tiêu đề tùy chỉnh
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Xử lý yêu cầu OPTIONS để xác nhận CORS
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    // Tiếp tục xử lý yêu cầu
    next();
});

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connecDB();

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