const express = require('express');
const authController = require('../CONTROLLERS/authController');
const Router = express.Router();
const auth = require('../MIDWARE/auth.midware');

Router.get("/",auth,authController.login);
module.exports = {
    Router:Router
}