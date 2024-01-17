const db = require("../../models/index");
const userService = require("../service/userService");

let handleLogin = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            errCode: 1,
            message: "Email and password are required",
        });
    }

    let result = await userService.handleUserLogin(email, password);

    //set cookie
    if (data && data.access_token) {
        res.cookie('jwt', result.data.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    }

    return res.status(200).json(result);
};

let handleGetAllUser = async (req, res) => {
    try {
        let page = req.query.page;
        let limit = req.query.limit;
        if (page && limit) {
            let result = await userService.getUserWithPagination(+page, +limit);
            return res.status(200).json({
                errCode: 0,
                errMsg: 'ok',
                data: result
            });
        }

        let userId = req.query.id;
        if (userId) {
            let result = await userService.getAllUsers(userId);

            return res.status(200).json({
                errCode: 0,
                errMsg: "OK",
                data: result
            });
        } else {
            return res.status(400).json({
                errCode: 1,
                errMsg: "Id is required",
            });
        }

    } catch (error) {
        return res.status(200).json({
            errCode: 1,
            errMsg: "Error" + error.message,
        });
    }
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
        return res.status(400).json({
            errCode: 1,
            errMsg: "id is required",
        });
    }
    let result = await userService.deleteUserById(req.body.id);
    return res.status(200).json({
        errCode: result.errCode,
        errMsg: result.errMsg,
    });
};

let handleEditUser = async (req, res) => {
    let data = req.body;
    let result = await userService.updateUserById(data);
    return res.status(200).json(result);
};


module.exports = {
    handleLogin,
    handleGetAllUser,
    handleCreateUser,
    handleDeleteUser,
    handleEditUser,
};
