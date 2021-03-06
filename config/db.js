const mongoose = require('mongoose');
const config = require('config');
const db = config.get("mongoURI");

const conDb = async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true});
        console.log("Mongo db Connected");
    }
    catch(e){
        console.error(e.message);
        process.exit(1);
    }
}
module.exports = conDb;
