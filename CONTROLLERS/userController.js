const  userSchema  = require("../MODELS/user.model");
const {validationResult} = require('express-validator/check');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = async(req,res)=>{
    try{
        const errors = validationResult(req).errors;
        if(errors.length > 0){
            return res.status(400).json({"status":"Error","errors":errors})
        }
        const {name,password,email,conPass} = req.body;
        const checkUser = await userSchema.userSchema.findOne({email:email});
        if(!checkUser){
            const newUser =new userSchema.userSchema({
                name:name,
                password:password,
                email:email
            })
            // encrypt Password
            const salt =await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password,salt);
            newUser.password = hashPass;
            await newUser.save();
            // Generate Token
            const payload = {
                "name":newUser.name,
                "email":newUser.email,
                "id":newUser.id
            }
            jwt.sign(payload,config.get("secretKey"),{expiresIn:360000},async (err,token)=>{
                if(err){
                    console.log("Sorry There exists an error while generating the token.");
                    console.log(err);
                }else{
                    return await res.status(200).json({"status":"Success","msg":[token]})
                }
            })
        }
        else{
            return res.status(400).json({"status":"Error","errors":"Sorry There exists in the System with this email. Thank you."})
        }
    }catch(e){
        console.log("Error...");
        console.log(e.message);
    }
}

module.exports= {
    users:users
}