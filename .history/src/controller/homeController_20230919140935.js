const handlerHi = (req, res) => {
    return res.render('home.ejs');
}

const getAllUser = (req, res) => {
    return res.render('home.ejs');
}

const handleCreateUser = (req, res) => {
    return res.send('create user');
}


module.exports = {
    handlerHi, getAllUser, handleCreateUser
}