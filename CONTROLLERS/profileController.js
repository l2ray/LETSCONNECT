const ProfileSchema = require('../MODELS/Profile.model');
const userSchema = require('../MODELS/user.model');
const profileList = (req,res)=>{
    return res.status(200).send("Returinig all profiles in the System...")
}
const myProfile = async (req,res)=>{
    try{
        const curProfile = await ProfileSchema.findOne({user:req.user.id}).populate("users",["name","email"]);
        console.log(curProfile);
    
        return res.status(200).send("Profile content to be loaded later...");

    }catch(e){
        console.log(e)
        console.log("Sorry...Server Error Ooccured...");
    }
}
module.exports = {
    profileList :profileList,
    myProfile:myProfile
}