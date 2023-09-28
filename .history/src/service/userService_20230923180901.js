const db = require('../../models/index');
import bcrypt from 'bcryptjs'
var salt = bcrypt.genSaltSync(10);

let hashUserPassword = async (password) => {
    return await bcrypt.hashSync(password, salt);
}

const getAllUser = async (userId) => {
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

let createUser = async (email, password, username) => {
    try {
        let hashPasswordBcrypt = await hashUserPassword(password);
        await db.User.create({
            email: email,
            password: hashPasswordBcrypt,
            username: username
        });

        return {
            errCode: 0,
            message: 'ok',
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports = {
    createUser, getAllUser
}