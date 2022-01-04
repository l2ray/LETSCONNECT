const express = require('express');
const postController = require('../CONTROLLERS/postController');
const Router = express.Router();
const {check} = require('express-validator/check');
const auth = require('../MIDWARE/auth.midware');

Router.get("/posts",postController.posts);
Router.post("/add",[auth,[check("title","Sorry Title is required...").not().isEmpty()]],postController.addPost);
Router.post("/comment/:pId",[auth,[check("comment","Sorry Coment is required").not().isEmpty()]],postController.postComment);
module.exports = Router;