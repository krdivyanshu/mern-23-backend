const {Schema,model}=require("mongoose");

const contactschema=new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    message:{type:String,required:true},

})
const contact=new model ('contact',contactschema);
module.exports=contact;
