const db = require("../../models/index");
const groupService = require("../service/groupService");

const handleGetAllGroup = async (req, res, next) => {
    try {
        let result = await groupService.getAllGroup();

        return res.status(200).json({
            errCode: result.errCode,
            errMsg: result.errMsg,
            data: result.data,
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            errMsg: 'Error: ' + error.message,
        });
    }
}

module.exports = {
    handleGetAllGroup
}