
const db = require("../../models/index");
const userService = require("../service/userService");

const handlerHi = (req, res) => {
    return res.render('home.ejs');
}

const getAllUser = (req, res) => {
    return res.render('home.ejs');
}

let handleCreateUser = async (req, res) => {
    let user = await userService.createUser(req.body);
    return res.status(200).json({
        errCode: 1,
        message: 'User created successfully',
        data: user
    });
};


module.exports = {
    handlerHi, getAllUser, handleCreateUser
}