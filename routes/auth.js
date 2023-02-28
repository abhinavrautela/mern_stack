const express = require('express')
const router = express.Router();
const { createUsers } = require('../controller/auth')
router.get('/signUp', createUsers)

exports.authRouter = router
