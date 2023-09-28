var bcrypt = require('bcryptjs');
const db = require('../../models/index');
var salt = bcrypt.genSaltSync(10);

let createUser = async (data) => {
    try {
        let hasdPasswordBcrypt = await hashUserPassword(data.password);
        let dataUser = await db.User.create({
            email: data.email,
            password: hasdPasswordBcrypt,
            username: data.username
        })
        return dataUser;
    } catch (error) {
        console.log('Fail to add new!', error);
    }
}
//Bcrypt
let hashUserPassword = async (password) => {
    return await bcrypt.hashSync(password, salt);
}

const getAllUsers = async (userId) => {
    try {
        let users = null;
        if (userId === 'All') {
            users = await db.User.findAll({
                attributes: {
                    exclude: ['password']
                }
            });
        } else if (userId) {
            users = await db.User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: ['password']
                },
            });
        }
        return users;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
};

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