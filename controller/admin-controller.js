const { get } = require("mongoose");
const User=require("../model/user-model");
const contact=require("../model/contact-model");


// write alluser logic
const getallusers=async(req,res)=>{
    try {
        // find all data excepts password.
        const users=await User.find({},{password:0});
        if(!users || users.length===0){
            return res.status(404).json({msg:"No user found"});
        }
        return res.status(200).json(users);
    } 
    catch (error) {
        next(error);
    }
}

// write allcontact logic.
const getallcontacts=async(req,res)=>{
    try {
        const contacts=await contact.find();
        if(!contacts || contacts.length===0){
            return res.status(404).json({msg:"No contact data found"});
        }
        return res.status(200).json(contacts);  
    } 
    catch (error) {
        next(error);
        
    }
}

// logic to delte user details from monogodb database by using id;
const deleteuserbyid=async(req,res)=>{
    try {
        // when ever we want to take any things from URL . then we use params.
        const id=req.params.id;
        // deleteOne() operation will delte the data matching with the id.
        await User.deleteOne({_id:id});
        return res.status(200).json({msg:"User data deleted sucessfully"});
        
    } 
    catch (error) {
        next(error);
    }

}

// logic to get single-user data by using id;
const getuserbyid=async(req,res)=>{
    try {
        // when ever we want to take any things from URL . then we use params.
        const id=req.params.id;
        // findOne() operation will fetch the data matching with the id.
        const data=await User.findOne({_id:id},{password:0});
        return res.status(200).json(data);
        
    } 
    catch (error) {
        next(error);
    }

}

// Update user details by using is id from URL.
const updateuserbyid=async(req,res)=>{
    try {
        // id of user which we have to update.
        const id=req.params.id;
        // updated user data is in req.body;
        const updateduserdata=req.body;
        // updateone takes two things . first filter to find location where to update. second it takes data which is to update.
        const updateduser=await User.updateOne(
            {_id:id},
            {$set:updateduserdata}
        );
        return res.status(200).json(updateduser); 
    } 
    catch (error) {
        console.log(error); 
    }

}

// Delete contacts details by using id;
const deletecontactbyid=async(req,res)=>{
    try {
        // when ever we want to take any things from URL . then we use params.
        const id=req.params.id;
        // deleteOne() operation will delte the data matching with the id.
        await contact.deleteOne({_id:id});
        return res.status(200).json({msg:"contact data deleted sucessfully"});
        
    } 
    catch (error) {
        next(error);
    }

}

module.exports={getallusers,getallcontacts,deleteuserbyid,getuserbyid,updateuserbyid,deletecontactbyid};