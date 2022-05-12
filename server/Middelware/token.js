const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.ACSSES_TOKEN_SECRET)
        next()
    }
    catch (err) {
        res.status(401).json({ err: "authorization failed" })
    }
}
module.exports = checkAuth