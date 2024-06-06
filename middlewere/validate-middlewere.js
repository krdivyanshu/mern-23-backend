// dont think much this is a method to write for validation using ZOD.

const { Error } = require("mongoose");


const validate=(schema)=>async(req,res,next)=>{
    try {
        const parsebody=await schema.parseAsync(req.body);
        req.body=parsebody;
        next();
    } 
    catch (err) {
        // this will print error.
        // console.log(err.errors[0].message);
        // this will cath the error message;
        const extradetails=err.errors[0].message;
        // this will response the error message
        res.status(400).json({msg:extradetails});
        
        // ALTERNATIVE APPROACH
        // instead of this we use next() to see message from error-handler.
        // const status=422;
        // const message="fill details properly";
        // const error1={status,message, extradetails};
        // next(err);
        
    }

}
module.exports=validate;