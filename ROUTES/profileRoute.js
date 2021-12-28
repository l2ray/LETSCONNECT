const express = require('express');
const profileController = require('../CONTROLLERS/profileController');
const Router = express.Router();


Router.get("/",profileController.profileList);
module.exports = {
    Router:Router
};