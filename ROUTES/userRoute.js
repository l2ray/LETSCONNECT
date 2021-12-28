const express = require('express');
const auth = require('../MIDWARE/auth.midware');
const userController = require('../CONTROLLERS/userController');
const {check} = require('express-validator/check')

const Router = express.Router();

// @route       GET api/userrs
// @desc        Test Route
// @access      Public
Router.post("/",[
    check('name','Sorry Please provide a valid name.').not().isEmpty(),
    check('email',"Please provide a valid Email").isEmail(),
    check('password','Please provide a password of atleast 6 characters').isLength({min:6}),
    check('conPass',"Sorry The confirm password can't be left Empty and it has to be the same as the password.").isLength({min:6})
],userController.users);

module.exports = Router;