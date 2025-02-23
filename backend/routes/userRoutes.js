const express = require('express');
const { signUp, login } = require('../controller/userController');

const router = express.Router();

router.post('/signUp', signUp);
router.post('/login', login);

module.exports = router;
