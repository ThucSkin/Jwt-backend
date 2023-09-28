const db = require("../../models/index");
const userService = require("../service/userService");

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            errCode: 1,
            message: "email and password are required",
        });
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMsg,
        user: userData.user ? userData.user : {},
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

let handleCreateUser = async (req, res) => {
    try {
        let message = await userService.createUser(req.body);

        return res.status(200).json({
            errCode: 0,
            errMsg: 'User created successfully',
            data: message
        });
    } catch (error) {
        console.log('error creating user');
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
