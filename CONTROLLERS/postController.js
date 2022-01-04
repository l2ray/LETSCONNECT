const PostsSchema = require('../MODELS/Post.model');
const userShema = require('../MODELS/user.model');
const profileSchema = require('../MODELS/Profile.model');
const {validationResult} = require('express-validator/check');
const posts = (req,res)=>{
    console.log("Returning all posts in the System...");
    res.status(200).send("Post Returning...")
};
const addPost = async(req,res)=>{
    try {
        const errors = validationResult(req);
        console.log(errors.errors);
        if(errors.errors.length > 0){
            console.log(errors.errors);

        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    posts,
    addPost
}