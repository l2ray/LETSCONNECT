const userSchema  = require("../MODELS/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config');
const {validationResult}= require('express-validator/check');

const login = async(req,res)=>{
    const errorFlag = validationResult(req).errors;
    if(errorFlag.length >0){
        return res.status(400).json({"status":"Error","msg":errorFlag})
    }
    try{
        const {email,password} = req.body;
        const curUser = await userSchema.userSchema.findOne({email});
        if(curUser){
            const actPassword = await bcrypt.compare(password,curUser.password);
            if(actPassword){
                const payLoad = {
                    id: curUser.id,
                    name: 'Lamin O. Njie',
                    email: 'njies@test.gs',
                  }
                  jwt.sign(payLoad,config.get("secretKey"),{expiresIn:36000},async(err,token)=>{
                      if(err)throw err;
                       return await res.status(200).json({"Status":"Success","msg":token});
                  })

            }else{
                return res.status(400).json({"status":"Error","msg":"Sorry Either your password or Email or Both are wrong, Please Check and confirm that they are correct."})
            }
        }
        else{
            return res.status(400).json({"status":"Error","msg":"Sorry Either your password or Email or Both are wrong, Please Check and confirm that they are correct."}) 
        }

    }catch(e){
        return res.status(500).json({"Status":"Errorss","msg":e})
    }

    // res.status(200).send("Login Functionality...")
};

module.exports = {
    login:login
}