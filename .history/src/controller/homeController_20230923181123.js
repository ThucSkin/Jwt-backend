
const userService = require("../service/userService");

const getAllUser = async (req, res) => {
    let data = await userService.getAllUser();
    return res.status(200).json(data);
}

let handleCreateUser = async (req, res) => {
    let user = await userService.createUser(req.body);
    return res.status(200).json(user);
};


module.exports = {
    handlerHi, getAllUser, handleCreateUser
}