const express = require('express');
const profileController = require('../CONTROLLERS/profileController');
const Router = express.Router();
const auth = require('../MIDWARE/auth.midware')


Router.get("/",profileController.profileList);
Router.get("/me",auth,profileController.myProfile);
module.exports = {
    Router:Router
};