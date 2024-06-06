const jwt=require("jsonwebtoken");
const User=require("../model/user-model");


// in middleware next is an extra parameter there,so when you call next then it pass to next middlewere. 
const authmiddleware=async (req,res,next)=>{
    // take token from request header having authorization as string type.
    const token = req.header("Authorization");
    // const token=req.body.headers.Authorization;
    // here token contains Bearer_jwttoken.
    if (!token) {
        console.log("token",token)

        // If you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP" response.
        return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });         
    }
    // here token contains Bearer_jwttoken.
    const jwttoken = token.replace("Bearer", "").trim();
    // replace/cut Bearer from token
    // then tream() will cut any space in beginig. so now real jwttoken we will get.
    console.log(jwttoken);  //this will print real jwttoken.
    try {
        const isverified=jwt.verify(jwttoken,process.env.JWT_SECRET_KEY);
        // jwttoken is verified with secreate key.
        // so isverified contain all payload(like:email,isadmin,userId) that is used for generating the token. simply verify means decode payload from jwttoken.
        // console.log(isverified);

        // Using that data find the all details of user using to that jwttoken`s email from monogodb database.
        // getting the complete user details & also we don't want password to be sent
        const userdata=await User.findOne({email:isverified.email}).select({password:0});
        // this userdata contains all information about,
        // console.log(userdata) // it stores all information.

        // creating custom property for our convienience;
        req.token = token;
        req.user = userdata;
        req.userID = userdata._id;

        // Move on to the next middleware or route handler
        next();
    } 
    catch (error) {
        return res.status(401).json({ message: "Unauthorized,Invalid  Token" }); 
    }
}
module.exports=authmiddleware;