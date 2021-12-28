const express = require('express');
const postController = require('../CONTROLLERS/postController');
const Router = express.Router();

Router.get("/posts",postController.posts);

module.exports = Router;