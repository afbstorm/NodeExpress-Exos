const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.post('/register', UserController.register);
router.get('/list', UserController.getAll);
router.get('/user/:id', UserController.getUserById);
router.post('/login', UserController.login)
router.get('/protected', UserController.protected);

module.exports = router;