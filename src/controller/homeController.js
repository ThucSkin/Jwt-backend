const db = require("../../models/index");
const userService = require("../service/userService");

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            errCode: 1,
            message: "Email and password are required",
        });
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        errMsg: userData.errMsg,
        data: userData.data ? userData.data : {},
    });
};

let handleGetAllUser = async (req, res) => {
    let id = req.query.id; //all or id
    if (!id) {
        return res.status(400).json({
            errCode: 1,
            message: "id is required",
        });
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        message: "OK",
        data: users
    });
};

const checkEmail = async (email) => {
    let user = await db.User.findOne({
        where: { email: email }
    })

    return user ? true : false;
}

const handleCreateUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra xem địa chỉ email đã tồn tại trong cơ sở dữ liệu chưa
        const emailExists = await checkEmail(email);
        if (emailExists) {
            return res.status(200).json({
                errCode: 1,
                errMsg: 'Địa chỉ email đã tồn tại',
            });
        }
        if (password && password.length < 4) {
            return res.status(400).json({
                errCode: 1,
                errMsg: 'Password must be at least 4 characters',
            });
        }

        // Nếu địa chỉ email không tồn tại, tiếp tục tạo người dùng
        const result = await userService.createUser(req.body);

        return res.status(200).json(result);
    } catch (error) {
        console.error('Lỗi khi tạo người dùng', error);
        return res.status(400).json({
            errCode: -1,
            errMsg: 'Tạo thất bại',
            error: error.message // Bổ sung thông điệp lỗi cụ thể (nếu có)
        });
    }
};



let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "id is required",
        });
    }
    let result = await userService.deleteUserById(req.body.id);
    return res.status(200).json(result);
};

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserById(data);
    return res.status(200).json(message);
};


module.exports = {
    handleLogin,
    handleGetAllUser,
    handleCreateUser,
    handleDeleteUser,
    handleEditUser,
};
