const profileList = (req,res)=>{
    return res.status(200).send("Returinig all profiles in the System...")
}
module.exports = {
    profileList :profileList
}