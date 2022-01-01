const express = require('express');
const profileController = require('../CONTROLLERS/profileController');
const Router = express.Router();
const auth = require('../MIDWARE/auth.midware')
const {check}= require('express-validator/check')

Router.get("/all",profileController.allProfile)
Router.get("/",profileController.profileList);
Router.get("/me",auth,profileController.myProfile);
Router.post("/",[[
    check("status","Status is Required").not().isEmpty(),
    check("skills","Skills are required").not().isEmpty()
],auth],profileController.createProfile);
Router.get('/:uId',profileController.devProfile);
Router.delete("/delete/:uId",profileController.deleteProfile);
Router.post("/add/experience/:uId",profileController.addExperience);
Router.delete("/experience/:uId/:eId",profileController.deleteExperience);
module.exports = {
    Router:Router
};