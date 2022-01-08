const PostsSchema = require('../MODELS/Post.model');
const userShema = require('../MODELS/user.model');
const profileSchema = require('../MODELS/Profile.model');
const {validationResult} = require('express-validator/check');
const { userSchema } = require('../MODELS/user.model');

const posts =async (req,res)=>{
   try {
       const posts = await PostsSchema.find().sort({date:-1});
       return res.status(200).json({"Status":"Success","data":posts});
   } catch (error) {
       return res.status(500).json({"Status":"Error","msg":"server Errror"})
   }
};

const post = async(req,res)=>{
    try {
        const post = await PostsSchema.findById(req.params.pId);
        if(!post){
            return res.status(400).json({"Status":"Error","msg":"Sorry no such post for this id."})
        }
        return res.status(200).json({"Status":"Success","Data":post});
    } catch (error) {
        if(error.kind ==="ObjectId"){
            return res.status(400).json({"Status":"Error","msg":"Sorry no such post for this id."})
        }
        return res.status(500).json({"Status":"Error","data":"Server error..."});
    }
}

const addPost = async(req,res)=>{
    try {
        const errors = validationResult(req);
        console.log(errors.errors);
        if(errors.errors.length > 0){
            return res.status(400).json({"Status":"Error","data":errors.errors})
            console.log(errors.errors);
        }
        else{
            const userCommenting = await userShema.userSchema.findById(req.user.id);
            console.log(userCommenting);
            console.log("###################################");
            const newPost = new PostsSchema({
                user:req.user.id,
                text:req.body.title,
                avatar:"test Avatar",
                name:userCommenting.name
            });
            await newPost.save();
            return res.status(200).json({"Status":"Success","Data":"Comment Successfully Created","Data2":newPost});
        }
    } catch (error) {
        console.log(error.message);
    }
}
const postComment = async(req,res)=>{
    try {
        console.log("You are in the comment Section...")
        const errorData = validationResult(req);
        
    if(errorData.errors.length > 0){
        return res.status(400).json({"Status":"Error","Data":errorData.errors});
    }
    else{
        console.log("Comment succesfully passed..")
        const postToComment = await PostsSchema.findById(req.params.pId);
        // return res.status(200).json({postToComment})
        if(postToComment){
            // const userCommenting = await userShema.userSchema.findById(req.user.id);
            const userCommenting = await userShema.userSchema.findById(req.user.id);

        console.log("Comment succesfully passed...")
            const commentObj = {
                user:req.user.id,
                text:req.body.comment,
                name:userCommenting.name,
                avatar:"Test Avatar"
        }
        postToComment.comments.unshift(commentObj);
        await postToComment.save();
        return res.status(200).json({"Status":"Success","Data":"Post Successfully Commented","Data2":postToComment});  
        }
        else{
            return res.status(400).json({"Status":"Error","Data":"Sorry no such post to comment"});
        }
        
    }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"Status":"Error","Data":"Sorry There exists an error in the server while saving Comment..."});
    }
}

module.exports = {
    posts,
    addPost,
    postComment,
    post
}