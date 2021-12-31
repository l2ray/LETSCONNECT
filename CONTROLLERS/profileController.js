const ProfileSchema = require('../MODELS/Profile.model');
const userSchema = require('../MODELS/user.model');
const {validationResult} = require('express-validator/check')
const profileList = (req,res)=>{
    return res.status(200).send("Returinig all profiles in the System...");
}
const myProfile = async (req,res)=>{
    try{
        const curProfile = await ProfileSchema.findOne({user:req.user.id}).populate("user",["name","email"]);
        console.log(curProfile);
    
        return res.status(200).send("Profile content to be loaded later...");

    }catch(e){
        console.log(e)
        console.log("Sorry...Server Error Ooccured...");
    }
}

// @desc    Adding / Updating a Profile
// @access  PUBLIC 
// @route   POST api/profile/
const createProfile = async(req,res)=>{
    const errors = validationResult(req);
    if(errors.errors.length >0){
        return res.status(400).json({"Status":"Error","msg":errors.errors})
    }
    const {company,website,location,bio,status,githubusername,skills,youtube,facebook,twitter,instagram,linked} = req.body;
    const profileObj = {};
    if(company){profileObj.company = company}
    if(website){profileObj.website = website}
    if(location){profileObj.location = location}
    if(bio) {profileObj.bio = bio}
    profileObj.status = status;
    if(githubusername){
        profileObj.githubusername = githubusername;
    }
    profileObj.social = {};
    if(youtube){profileObj.social.youtube = youtube}
    if(facebook){profileObj.facebook = facebook}
    if(twitter){profileObj.twitter=twitter}
    if(instagram){profileObj.instagram = instagram}
    if(linked){profileObj.linked=linked}
    const skillsArr = [];
    skills.split(",").map(s=>{
        skillsArr.push(s.trim())
    })
    profileObj.skills =skillsArr;
    profileObj.user = req.user.id;
    console.log(req.user)
    try {
        const userFlag =await  ProfileSchema.findOne({user:req.user.id});
        console.log(userFlag);
        if(userFlag ){
            console.log("Updating a Profile...")
            const updateProfile = await ProfileSchema.findOneAndUpdate({user:req.user.id},{$set:profileObj})
            await updateProfile.save();
        }
        else{
            // update 
            console.log("Creating a new Profile...")
            const newProfile = new ProfileSchema(profileObj);
            await newProfile.save();
        }
        return res.status(200).json({"Status":"Success","msg":profileObj});
    } catch (error) {
        console.log(error)
        return res.status(500).json({"Status":"Error","msg":"Sorry There exists an error within the server..."})
    }
    

}

// Get All Profile in the System
const allProfile = async(req,res)=>{
    try {
        const allPro = await ProfileSchema.find().populate("user",["name","email"]);
        return res.status(200).json({"Status":"Sucess","data":allPro})
    } catch (error) {
        console.log(error);
        return res.status(500).json({"Status":"Error","msg":"Sorry There exists an error in the Server"});
    }
}
const devProfile= async(req,res)=>{
    try {
        const curProfile = await ProfileSchema.findOne({user:req.params.uId}).populate("user",["name","email"]);
        return res.status(200).json({"Status":"Success","data":curProfile});
    } catch (error) {
        return res.status(500).json({"Status":"Error","msg":"Sorry There exists an error in the Serverss"});
    }
}
module.exports = {
    profileList,
    myProfile,
    createProfile,
    allProfile,
    devProfile,
    
}