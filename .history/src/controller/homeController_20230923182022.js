
import userService from '../service/userService';

let getAllUser = async (req, res) => {
    let data = await userService.handleGetAllUser();
    return res.status(200).json(data);
}

let handleCreateUser = async (req, res) => {
    let user = await userService.createUser(req.body);
    return res.status(200).json(user);
};


module.exports = {
    getAllUser,
    handleCreateUser
};

