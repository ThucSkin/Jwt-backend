var jwt = require('jsonwebtoken');
require('dotenv').config();

const nonSecurePaths = ['/', '/login', '/register', '/user/delete'];

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET || 'thucskin';
    let token = null;

    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXPRIRES_IN || 30000
        });
    } catch (error) {
        console.log(error);
    }

    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET || 'thucskin';
    let decoded = null;

    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error);
    }

    return decoded;
}

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();

    let cookies = req.cookies;

    if (cookies || cookies.jwt) {
        let token = cookies.jwt;
        let decoded = verifyToken(token);

        if (decoded) {
            req.user = decoded;
            req.token = token;
            next();
        } else {
            return res.status(401).json({
                errCode: -1,
                data: '',
                errMsg: 'Không được phép truy cập'
            });
        }
    } else {
        return res.status(401).json({
            errCode: -1,
            errMsg: 'Not authorized the user.',
            data: ''
        });
    }
}


const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)
        || req.path === '/account')
        return next();

    if (req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;

        if (!roles || roles.length === 0) {
            return res.status(401).json({
                errCode: -1,
                errMsg: `Bạn không có quyền truy cập vào tài nguyên này`,
                data: ''
            })
        }

        let canAccess = roles.some(item => item.url === currentUrl);

        if (canAccess === true) {
            next();
        } else {
            return res.status(403).json({
                errCode: -1,
                errMsg: `You don't permission to access this resource`,
                data: ''
            })
        }
    } else {
        return res.status(403).json({
            errCode: -1,
            errMsg: `Not authorized to access this resource`,
            data: ''
        })
    }
}

module.exports = {
    createJWT, verifyToken,
    checkUserJWT, checkUserPermission
}