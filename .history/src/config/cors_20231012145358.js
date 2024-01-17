require('dotenv').config();

const baseURL = process.env.REACT_URL || 'http://localhost:3000';

// Middleware để xử lý CORS
const configCors = (app) => {
    app.use((req, res, next) => {
        // Cho phép tất cả các nguồn gốc (thay đổi '*' thành địa chỉ nguồn cụ thể nếu cần)
        res.setHeader('Access-Control-Allow-Origin', baseURL);

        // Cho phép truy cập với thông tin xác thực (credentials)
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        // Cho phép các phương thức yêu cầu cụ thể
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');

        // Cho phép các tiêu đề tùy chỉnh
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

        // Tiếp tục xử lý yêu cầu
        next();
    });
}

export default configCors