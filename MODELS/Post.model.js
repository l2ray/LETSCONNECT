const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref: 'users'
    },
    text:{
        type:String,
        required:true,

    },
    name:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
    },
    like:[
        {
            user:{
                type:mongoose.Types.ObjectId,
                ref:'users'
            }
        }
    ],
    deslike:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                res:"users"
            }
        }
    ],
    comments:[
        {
            user:{
                type:mongoose.Types.ObjectId,
                ref:'users'
            },
            text:{
                type:String,
                require:true
            },
            name:{
                type:String
            },
            avatar:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = Post = mongoose.model("posts",postSchema);