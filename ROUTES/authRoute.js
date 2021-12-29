const express = require('express');
const authController = require('../CONTROLLERS/authController');
const Router = express.Router();
const auth = require('../MIDWARE/auth.midware');
const {check} = require('express-validator/check');

Router.post("/",[
    check('email',"Sorry Please provide a login Email").isEmail(),
    check('password',"Sorry Password is required to access").not().isEmpty()
],authController.login);
module.exports = {
    Router:Router
}