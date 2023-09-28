const handlerHi = (req, res) => {
    return res.render('home.ejs');
}

const getAllUser = (req, res) => {
    return res.render('home.ejs');
}

const handleCreateUser = (req, res) => {
    console.log('check ', req.body);
    return res.send('create user');
}


module.exports = {
    handlerHi, getAllUser, handleCreateUser
}