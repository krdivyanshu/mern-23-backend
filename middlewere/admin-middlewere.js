const adminmiddlewere=async(req,res,next)=>{
    try {
        console.log(req.user);
        // if we send response at this stage then next middlewere will not run. As response gets sent at this stage.
        // res.status(200).json({msg:req.user});
        const adminrole=req.user.isAdmin;
        if(!adminrole){
            res.status(404).json({msg:"Access denied. User is not Admin"});
        }
        // if user ia admin then procede/ go to next middlewere.
        next();

        
    } 
    catch (error) {
        next(error);
    }

}

module.exports=adminmiddlewere;