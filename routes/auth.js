const express = require('express')
const router = express.Router();
const { signUp, login } = require('../controller/auth')
router
.get('/signUp', signUp)
.get('/login', login)

exports.authRouter = router
