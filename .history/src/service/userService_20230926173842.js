var bcrypt = require('bcryptjs');
const db = require('../../models/index');
var salt = bcrypt.genSaltSync(10);

let createUser = async (data) => {
    try {
        let hasdPasswordBcrypt = await hashUserPassword(data.password);
        await db.User.create({
            email: data.email,
            password: hasdPasswordBcrypt,
            username: data.username
        })
    } catch (error) {
        console.log('Fail to add new!', error);
    }
}
//Bcrypt
let hashUserPassword = async (password) => {
    return await bcrypt.hashSync(password, salt);
}

let getAllUsers = async (req, res) => {
    return await db.User.findAll({
        raw: true
    });
}

let deleteUserById = async (id) => {
    return await db.User.destroy({
        where: { id: id }
    });
}

let getUserById = async (userId) => {
    return await db.User.findOne({
        where: { id: userId },
        raw: true,
    });
}


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    deleteUserById,
}