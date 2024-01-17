
const db = require('../../models/index');


const getGroupWithRoles = async (user) => {
    try {
        let roles = await db.Group.findOne({
            where: { id: user.groupId },
            attributes: ['id', 'name', 'description', 'username'],
            include: [{
                model: db.Role,
                attributes: ['id', 'url', 'description'],
                through: { attributes: [] }
            }],
        });

        return roles ? roles : {};
    } catch (error) {
        console.log('Error:', error);
        return {
            errCode: 1,
            errMsg: 'Error: ' + error.message,
        }
    }
};

module.exports = {
    getGroupWithRoles
}