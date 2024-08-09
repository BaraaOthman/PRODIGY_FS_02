const { body, validationResult } = require('express-validator');

exports.validateRegistration = [
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    
];

exports.validateLogin = [
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('password').isString().notEmpty().withMessage('Password is required'),
    
];
