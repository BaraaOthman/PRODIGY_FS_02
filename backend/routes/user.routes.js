const express = require('express');
const { register, login, getUsers, deleteUserController } = require('../controllers/user.controller');
const { validateRegistration, validateLogin } = require('../validators/user.validators');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers);
router.delete('/deleteUser',deleteUserController,)

module.exports = router;
