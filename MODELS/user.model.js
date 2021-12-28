const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    avata:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports={
    userSchema :mongoose.model("users",userSchema)
}