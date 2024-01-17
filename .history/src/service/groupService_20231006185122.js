var bcrypt = require('bcryptjs');
const db = require('../../models/index');
var salt = bcrypt.genSaltSync(10);

const getAllGroup = async (userId) => {
    try {
        let users = null;
        let temp;

        if (userId === 'All') {
            users = await db.User.findAll({
                attributes: {
                    exclude: ['password']
                },
                include: { model: db.Group, attributes: ['name', 'description'] }
            });
        } else if (userId) {
            users = await db.User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: ['password']
                },
                include: { model: db.Group, attributes: ['name', 'description'] }
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

module.exports = {
    getAllGroup
}