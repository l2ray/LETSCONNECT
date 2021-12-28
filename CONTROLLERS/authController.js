const userSchema  = require("../MODELS/user.model");

const login = async(req,res)=>{
    const idToFind = req.user.id;
    const curUser = await userSchema.userSchema.findById(idToFind)
    console.log(curUser)
    console.log(req.user.id)
    res.status(200).send("Login Functionality...")
};

module.exports = {
    login:login
}