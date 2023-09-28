const handlerHi = (req, res) => {
    return res.render('home.ejs');
}

const getAllUser = (req, res) => {
    return res.render('home.ejs');
}

const handleCreateUser = async (req, res) => {
    try {
        // Check if email exists
        let check = await checkUserEmail(data.email);
        if (check.errCode === 0) {
            return {
                errCode: 1,
                errMsg: 'Email already exists'
            };
        } else {
            let hashPasswordBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                username: data.username,
                password: hashPasswordBcrypt,
            });
            return {
                errCode: 0,
                message: 'ok'
            }
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports = {
    handlerHi, getAllUser, handleCreateUser
}