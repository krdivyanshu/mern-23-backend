// ACTION : it is the description of of what you want to do.
// DISPATCH : it is the function that carries out that action.

// Controllers refers to a part of code that is responsible for handling the application`s logic.

const { response } = require("express");
const User=require("../model/user-model");
const bcrypt=require("bcryptjs");

// home logic
const home=async (req,res)=>{
    try{
        res.status(200).send("welcome to mern series by using router  ");
    }
    catch(error){
        console.log(error);
    }
}


// Registration Logic 
const registar=async (req,res)=>{
    try{
        // console.log(req.body);
        // .json send data in object formate. in backend data will always come in string formate.
        // req.status().json({}) also send response in json formate. And we use curlybraces because we want to send data in object formate, key and value pair.
        const data=req.body;
        const {username,email,phone,password}=req.body;
        const userexists=await User.findOne({email:email});
        // if user exists
        if(userexists){
            return response.status(400).json({msg:"email already exists"});
        }
        // if user dont exists 
        // protect password first
        // const saltround=10;
        // const hash_password=await bcrypt.hash(password,saltround);
        // then create
        // const usercreated=await User.create({username,email,phone,password:hash_password});
        const usercreated=await User.create({username,email,phone,password});

        // print new request message in console
        res.status(200).json({
            // msg:usercreated,
            msg:"registration sucessful",
            token:await usercreated.generateToken (),
            userId:usercreated._id.toString(),
        });
        
    }
    catch(error){
        res.status(400).send({msg:"page is not found"});
        // next(error);
        // console.log(error);
    }
}

// USER LOGIN LOGIC ;
const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const userexist=await User.findOne({email});
        // console.log(userexist);
        // NOTE : this userexist contains all schema related information in userexist.
        // if user donot exists
        if(!userexist){
            return res.status(400).json({msg:"invalid email"});
        }
        // if userexists then match/compare the credential. wheather that user is valid or not.
        const user=await bcrypt.compare(password,userexist.password);
        console.log(user);
        if(user){
            res.status(200).json({
                msg:"login sucessful",
                token:await userexist.generateToken (),
                userId:userexist._id.toString(),
            })
        }
        else{
            res.status(401).json({msg:"invalid  password"});
        }
 
    } 
    catch (error) {
        res.status(500).json({msg:"internal server error"}); 
    }
}

// To send user data : USER LOGIC;
const user=(req,res)=>{
    try {
        const userdata=req.user;
        console.log(userdata);
        // return response;
        return res.status(200).json({user:userdata});
    } 
    catch (error) {
        console.log(`error from the user route ${error}`);
    }
}


module.exports= {home,registar,login,user};