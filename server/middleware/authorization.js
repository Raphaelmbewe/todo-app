const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorize = async (req, res, next) => {
    try {
        const token = req.header("token")
        if (!token) {
            return res.status(403).json({message: "Not Authorized"})
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload.user
    } catch (err) {
        console.error(err.message);
        res.status(403).json({message: "Not Authorized"});
    }
}
module.exports = authorize;