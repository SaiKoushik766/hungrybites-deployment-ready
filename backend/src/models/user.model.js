const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobilenumber:{
        type:String,
        required:true
    },
    loyaltyPoints:{
        type:Number,
        default:0
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    rewardavailable:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},
{
    timestamps:true
}
)
module.exports = mongoose.model('User',userschema)

