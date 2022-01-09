const express = require('express');
const postController = require('../CONTROLLERS/postController');
const Router = express.Router();
const {check} = require('express-validator/check');
const auth = require('../MIDWARE/auth.midware');

Router.get("/posts",auth,postController.posts);
Router.get("/post/:pId",auth,postController.post);
Router.delete("/delete/:pId",postController.removePost);
Router.post("/add",[auth,[check("title","Sorry Title is required...").not().isEmpty()]],postController.addPost);
Router.post("/comment/:pId",[auth,[check("comment","Sorry Coment is required").not().isEmpty()]],postController.postComment);
Router.post("/like/:pId",auth,postController.likePost);
Router.post("/dislike/:pId",auth,postController.disLikePost);
module.exports = Router;