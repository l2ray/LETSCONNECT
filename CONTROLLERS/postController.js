const posts = (req,res)=>{
    console.log("Returning all posts in the System...");
    res.status(200).send("Post Returning...")
};

module.exports = {
    posts:posts
}