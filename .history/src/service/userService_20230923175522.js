const db = require('../../models/index');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

let hashUserPassword = async (password) => {
    return await bcrypt.hashSync(password, salt);
}

// let handleUserLogin = async (email, password) => {
//     let userData = {};

//     try {
//         let isExist = await checkUserEmail(email);
//         if (isExist) {
//             let user = await db.User.findOne({
//                 attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName'],
//                 where: {
//                     email: email,
//                 },
//                 raw: true
//             });
//             if (user) {
//                 let check = bcrypt.compareSync(password, user.password);
//                 if (check) {
//                     userData.errCode = 0;
//                     userData.errMsg = 'ok';

//                     delete user.password;
//                     userData.user = user;
//                 } else {
//                     userData.errCode = 1;
//                     userData.errMsg = 'Wrong password';
//                 }
//             } else {
//                 userData.errCode = 1;
//                 userData.errMsg = 'User is not found';
//             }
//         } else {
//             userData.errCode = 2;
//             userData.errMsg = 'User is not found';
//         }
//     } catch (error) {
//         userData.errCode = 3;
//         userData.errMsg = 'Error occurred';
//     }

//     return userData;
// }


let checkUserEmail = async (email) => {
    try {
        userData = {};
        let user = await db.User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            userData.errCode = 0;
            userData.errMsg = 'ok';
            userData.user = user;
            return userData;
        } else {
            userData.errCode = 1;
            userData.errMsg = 'Your email is required or exists.';
            return userData;
        }
    } catch (error) {
        console.error(error)
    }
}

// const getAllUsers = async (userId) => {
//     try {
//         let users = null;
//         if (userId === 'All') {
//             users = await db.User.findAll({
//                 attributes: {
//                     exclude: ['password']
//                 }
//             });
//         } else if (userId) {
//             users = await db.User.findOne({
//                 where: { id: userId },
//                 attributes: {
//                     exclude: ['password']
//                 },
//             });
//         }
//         return users;
//     } catch (error) {
//         console.log('Error:', error);
//         throw error;
//     }
// };

let createUser = async (email, password, username) => {
    try {
        let hashPasswordBcrypt = await hashUserPassword(password);
        await db.User.create({
            email: email,
            password: password,
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
    checkUserEmail,
    createUser,
}