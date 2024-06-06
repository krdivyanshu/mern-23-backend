const {Schema,model}=require("mongoose");

const serviceschema=new Schema({
    service: {type:String, reqired:true},
    description: {type:String,reqired:true},
    price: {type:String,reqired:true},
    provider: {type:String,reqired:true},
});

const Service=new model("Service",serviceschema);
module.exports=Service;


