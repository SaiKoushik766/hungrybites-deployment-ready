const usermodel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
async function registeruser(req,res){
    const{name,username,password,mobilenumber} = req.body;
    const isuseralreadyexists = await usermodel.findOne({
        username
    })
    if(isuseralreadyexists){
        return res.status(400).json({
            message:"the user already exists"
        })
    }
    const hashedpassword = await bcrypt.hash(password,10)
    const user = await usermodel.create({
        name,
        username,
        password:hashedpassword,
        mobilenumber
    })
    const token = jwt.sign({
        id:user._id,
        role:user.role
    },'6ec4dcf3f398bf3c4a0ad9c2c61ebe37e0e83cd1893697b8')
   res.cookie('token', token,{
    httpOnly: true,
    secure:false, // Set to true in production with HTTPS
    sameSite: 'lax', // Adjust as needed (e.g., 'strict' or 'none')
   });
    res.status(201).json({
        message:"user registered successfully",
        user:{
            name:user.name,
            username:user.username,
            mobilenumber:user.mobilenumber,
            role:user.role
        }
    })
}
async function loginuser(req,res){
    const {username,password} = req.body;
    const user = await usermodel.findOne({
        username
    })
    if(!user){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }
    const ispasswordvalid = await bcrypt.compare(password,user.password)
    if(!ispasswordvalid){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }
    const token = jwt.sign({
        id:user._id,
        role:user.role
    },'6ec4dcf3f398bf3c4a0ad9c2c61ebe37e0e83cd1893697b8')
   res.cookie('token', token);
    res.status(200).json({
        message:"user logged in successfully",
        token,
        user:{
            name:user.name,
            username:user.username,
            role:user.role,
            mobilenumber:user.mobilenumber
        }
    })
}

async function logoutuser(req,res){
    res.clearCookie('token');
    res.status(200).json({
        message:"user logged out successfully"
    })
}
module.exports = {
    registeruser,
    loginuser,
    logoutuser
}