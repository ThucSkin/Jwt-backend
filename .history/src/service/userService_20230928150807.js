var bcrypt = require('bcryptjs');
const db = require('../../models/index');
var salt = bcrypt.genSaltSync(10);

const createUser = async (data) => {
    try {
        if (!data.email && !data.password) {
            return {
                errCode: 1,
                errMsg: 'Email & Mật khẩu chưa được xác định',
            };
        }

        // Băm mật khẩu của người dùng bằng bcrypt
        const hashedPassword = await hashUserPassword(data.password);

        // Tạo một người dùng mới trong cơ sở dữ liệu
        const dataUser = await db.User.create({
            email: data.email,
            password: hashedPassword,
            username: data.username,
            phone: data.phone
        });

        return {
            errCode: 0,
            errMsg: 'Tạo người dùng thành công',
            data: dataUser
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