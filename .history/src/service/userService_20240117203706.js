
const db = require('../../models/index');
require('dotenv').config();

let bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);

import { createJWT } from '../middleware/JWTaction';
import { getGroupWithRoles } from './JWTService';

let handleUserLogin = async (email, password) => {
    try {
        let isExist = await checkUserEmail(email);
        if (!isExist) {
            return {
                errCode: 1,
                errMsg: 'Username or password incorrect!'
            }
        } else {
            let user = await db.User.findOne({
                where: {
                    email: email,
                },
                raw: true
            });
            if (!user) {
                return {
                    errCode: 1,
                    errMsg: 'Username or password incorrect!'
                }
            } else {
                let checkPassword = bcrypt.compareSync(password, user.password);
                if (checkPassword) {
                    let groupWithRoles = await getGroupWithRoles(user);

                    let payload = {
                        email: user.email,
                        username: user.username,
                        groupWithRoles,
                    }

                    let token = createJWT(payload);

                    return {
                        errCode: 0,
                        errMsg: 'ok',
                        data: {
                            access_token: token,
                            groupWithRoles,
                            email: user.email,
                            username: user.username
                        }
                    }
                } else {
                    return {
                        errCode: 1,
                        errMsg: 'Username or password incorrect!'
                    }
                }
            }
        }
    } catch (error) {
        return {
            errCode: 1,
            errMsg: 'Error: ' + error.message
        }
    }
}

let checkUserEmail = async (email) => {
    try {
        let user = await db.User.findOne({
            where: {
                email: email
            }
        });
        if (user) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const createUser = async (data) => {
    try {
        if (!data.email) {
            return {
                errCode: 1,
                errMsg: 'Email is required',
            };
        }

        // Băm mật khẩu của người dùng bằng bcrypt
        const hashedPassword = await hashUserPassword(data.password);

        // Tạo một người dùng mới trong cơ sở dữ liệu
        await db.User.create({
            email: data.email,
            password: hashedPassword,
            username: data.username,
            phone: data.phone,
            address: data.address,
            sex: data.sex,
            groupId: 2,
        });

        return {
            errCode: 0,
            errMsg: 'Tạo người dùng thành công',
        };
    } catch (error) {
        console.error('Thêm người dùng mới thất bại!', error);
        return {
            errCode: -1,
            errMsg: 'Tạo thất bại',
            error: error.message // Bổ sung thông điệp lỗi cụ thể (nếu có)
        };
    }
};

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.User.findAndCountAll({
            order: [['createdAt', 'DESC']],
            attributes: {
                exclude: ['password']
            },
            offset: offset,
            limit: limit,
            include: { model: db.Group, attributes: ['name', 'description', 'id'] }
        })

        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        return data;
    } catch (error) {
        return {
            errCode: -1,
            errMsg: 'Error!, ' + error.message,
        };
    }
};

//Bcrypt
let hashUserPassword = async (password) => {
    return await bcrypt.hashSync(password, salt);
}

const getAllUsers = async (userId) => {
    try {
        let users = null;
        let temp;

        if (userId === 'All') {
            users = await db.User.findAll({
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: { model: db.Group, attributes: ['name', 'description', 'id'] }
            });
        } else if (userId) {
            users = await db.User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: ['password']
                },
                include: { model: db.Group, attributes: ['name', 'description', 'id'] }
            })

            temp = users;
            if (!temp) {
                return 'User not found'
            }
        }

        return users;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
};

const deleteUserById = async (id) => {
    try {
        if (id) {
            const result = await db.User.destroy({
                where: { id: id }
            });

            if (result === 1) {
                return {
                    errCode: 0,
                    errMsg: 'Delete user successfully'
                };
            } else {
                return {
                    errCode: 1,
                    errMsg: 'User not found'
                };
            }
        } else {
            return {
                errCode: 1,
                errMsg: 'ID is required'
            };
        }
    } catch (error) {
        return {
            errCode: 1,
            errMsg: 'Internal Server Error'
        };
    }
};

let updateUserById = async (data) => {
    try {
        if (!data.id) {
            return {
                errCode: 1,
                message: 'Id is required'
            };
        }
        let user = await db.User.findOne({
            where: { id: data.id },
            attributes: {
                exclude: ['password']
            },
            include: { model: db.Group, attributes: ['name', 'description', 'id'] },
            raw: false
        });

        if (user) {
            user.username = data.username;
            user.address = data.address;
            user.sex = data.sex;
            user.phone = data.phone;
            user.groupId = data.groupId;

            await user.save();
            return {
                errCode: 0,
                errMsg: 'User updated!',
                data: data

            };
        } else {
            return {
                errCode: 1,
                errMsg: 'User is not found!'
            };
        }
    } catch (error) {
        console.error(error);
        return {
            errCode: -1,
            errMsg: 'An error occurred'
        };
    }
};


module.exports = {
    handleUserLogin,
    createUser, getAllUsers, deleteUserById, updateUserById, getUserWithPagination
}