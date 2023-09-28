const handlerHi = (req, res) => {
    return res.render('home.ejs');
}

const getAllUser = (req, res) => {
    return res.render('home.ejs');
}

const handleCreateUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    return res.send('create user');
}


module.exports = {
    handlerHi, getAllUser, handleCreateUser
}