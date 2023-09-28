// Middleware để xử lý CORS
const configCors = () => {

}
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