// errorMiddlewere is a middlewere; 
const errorMiddlewere=(err,req,res,next)=>{
    console.log("abc");
    const status=err.status || 500;
    const message=err.message || "BACKEND ERROR";
    const extradetails=err.extradetails || "error from backend";
    res.status(status).json({message,extradetails});


}
module.exports=errorMiddlewere;