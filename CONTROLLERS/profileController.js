const ProfileSchema = require('../MODELS/Profile.model');
const userSchema = require('../MODELS/user.model');
const {validationResult} = require('express-validator/check');
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

const deleteProfile = async(req,res)=>{
    try {
        const userToDel = await userSchema.userSchema.findById(req.params.uId);
        const profileToDel = await ProfileSchema.findOne({user:req.params.uId});
        if(profileToDel && userToDel){
            await profileToDel.delete();
            await userToDel.delete();
            return res.status(200).json({"Status":"Success","data":"About to delete user."});
        }
        else{
            return res.status(400).json({"Status":"Success","data":"Sorry There is no such profile or user in the System..."});
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"Status":"Error","msg":"Sorry There exists an error in the server."});
    }
}

const addExperience =async(req,res)=>{
    try {
        // Router.post("/add/experience/:uId",profileController.addExperience);
        const {title,company,location,from,to,description} = req.body;
        const experienceData = {};
        if(title){experienceData.title = title}
        if(company){experienceData.company = company}
        if(from){experienceData.from = from};
        if(location){experienceData.location = location}
        if(to){
            experienceData.to = to;
            experienceData.current = false;
        }else{
            experienceData.current = true;
        }
        if(description) {experienceData.description = description}
        const profileToUpdate = await ProfileSchema.findOne({user:req.params.uId});
        if(profileToUpdate){
            profileToUpdate.experience.unshift(experienceData)
            await profileToUpdate.save();
        }

        return res.status(200).json({"Status":"Success","msg":""});
    } catch (error) {
        return res.status(500).json({"Status":"Error","msg":"Sorry There is no such profile or user in the System..."});
    }
}
const deleteExperience = async(req,res)=>{
    try{
        const userProfile = await ProfileSchema.findOne({user:req.params.uId});
        if(userProfile){
            const experience = userProfile.experience.filter(e=>{
                return e.id !== req.params.eId
            });
            userProfile.experience = experience;
            await userProfile.save();
            return res.status(200).json({"Status":"Success","data":userProfile});
        }else{
            return res.status(400).json({"Status":"Error","data":"No such User..."});
        }
    }catch(error){
        return res.status(500).json({"Status":"Error","msg":"Sorry There exists an error  in the server."});
    }
}
const addEducation = async(req,res)=>{
    try {
        // utreck university 
                // Router.post("/add/experience/:uId",profileController.addExperience);
                const {school,degree,fieldofstudy,from,to,description} = req.body;
                const eduData = {};
                if(school){eduData.school = school}
                if(degree){eduData.degree = degree}
                if(from){eduData.from = from};
                if(fieldofstudy){eduData.fieldofstudy = fieldofstudy}
                if(to){
                    eduData.to = to;
                    eduData.current = false;
                }else{
                    eduData.current = true;
                }
                if(description) {eduData.description = description}
                const profileToUpdate = await ProfileSchema.findOne({user:req.params.uId});
                if(profileToUpdate){
                    profileToUpdate.education.unshift(eduData)
                    await profileToUpdate.save();
                }
        
                return res.status(200).json({"Status":"Success","msg":""});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"Status":"Error","msg":"Sorryyy There exists an error  in the server."});
    }
}
const deleteEducation = async(req,res)=>{
    try{
        const userProfile = await ProfileSchema.findOne({user:req.params.uId});
        if(userProfile){
            const edu = userProfile.education.filter(e=>{
                return e.id !== req.params.eId
            });
            userProfile.education = edu;
            await userProfile.save();
            return res.status(200).json({"Status":"Success","data":userProfile});
        }else{
            return res.status(400).json({"Status":"Error","data":"No such User..."});
        }
    }catch(error){
        return res.status(500).json({"Status":"Error","msg":"Sorry There exists an error  in the server."});
    }
}

module.exports = {
    profileList,
    myProfile,
    createProfile,
    allProfile,
    devProfile,
    deleteProfile,
    addExperience,
    deleteExperience,
    addEducation,
    deleteEducation,
}