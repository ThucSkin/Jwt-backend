
const db = require('../../models/index');


const getAllGroup = async () => {
    try {
        let data = await db.Group.findAll();

        return {
            errCode: 0,
            errMsg: 'ok',
            data
        }
    } catch (error) {
        console.log('Error:', error);
        return {
            errCode: 1,
            errMsg: 'Error: ' + error.message,
        }
    }
};

module.exports = {
    getAllGroup
}