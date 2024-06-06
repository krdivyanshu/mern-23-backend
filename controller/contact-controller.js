const contact=require("../model/contact-model");
const contactform=async (req,res)=>{
    try {
        const response=req.body;
        await contact.create(response);
        return res.status(200).json({message:"message sent sucessfully"}); 
    } 
    catch (error) {
        return res.status(400).json({message:"message not sent sucessfully"}); 
    }
    
}

module.exports=contactform;