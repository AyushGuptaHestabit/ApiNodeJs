const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if (req.cookies.user) {
            next();
        } else {
            throw 'Invalid user ID';
        }
    } catch {
        res.status(401).json({
            success: false,
            error: "Please Login First..!"
        });
    }
};