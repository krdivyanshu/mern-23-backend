const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const userschema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
    

})
// secure password with the bcrypt
// data save hone se pahle this pre function will be called.
userschema.pre('save',async function(next){
    console.log("pre.method",this);
    // this means all the data in userschema.
    const user=this;
    // if password not modified.
    if(!user.isModified('password')){
        next();
    }
    // if password modified or created then encrypt it.
    try {
        const saltround=await bcrypt.genSalt(10);
        const hash_password=await bcrypt.hash(user.password,saltround);
        user.password=hash_password;
    } 
    catch (error) {
        next(error);
    }
})

// JWT is used for authentication & authorization in web application.
// 1.AUTHENTICATION: verify the identity of user or client.
// 2.AUTHORIZATION: determinig what action a user or client is allowed to perform.

// JWT web token
// Tokens,such as JWT are typically not stored in database along with other user details. instead they are issued by the server during the authentication process and then stored on the client-side(e.g.: cookies or localstorage) for later use.


// jwt is itself synchronous function.
// synchronous function means wait untill the task gets completed.
userschema.methods.generateToken= function() {
        const token= jwt.sign(
            // payload :the identity which you want to share, here userid,email,isadmin are payload;
            {
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        // signature
        // it is a two way incription-deciption technique. because here we secure data from sending data on frontend. we send data to frontened as in form of tokens.
        process.env.JWT_SECRET_KEY,
        {
           expiresIn:"3d", 
        }
        );
        return token; 
        
}





const User=mongoose.model("users",userschema);
module.exports =User;
