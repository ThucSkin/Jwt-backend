const handlerHi = (req, res) => {
    return res.render('home.ejs');
}

const getAllUser = (req, res) => {
    return res.render('home.ejs');
}

let handleCreateUser = async (req, res) => {
    let message = await userService.createUser(req.body);
    return res.status(200).json(message);
};


module.exports = {
    handlerHi, getAllUser, handleCreateUser
}