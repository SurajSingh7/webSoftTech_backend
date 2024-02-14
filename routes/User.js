const express = require("express")
const router = express.Router()

const {login,signup} = require("../controllers/Auth");

// Route for user login,signup,sendotp
router.post("/login", login)
router.post("/signup", signup)

module.exports = router