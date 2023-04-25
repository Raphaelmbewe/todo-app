const express = require("express");
const pool = require("../database");
const authorize = require("../middleware/authorization");

const router = express.Router();

router.get("/auth", authorize, async (req, res) => {
    try {
        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user])
        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: "Server error"});
    }
})
module.exports = router;