const {z}=require("zod");

const signupschema=z.object({
    username:z
    .string({required_error:"username is required"})
    .trim()
    .min(3,{message:"username must be of 3 length"})
    .max(250,{message:"username must not be more than 250 length"}),

    email:z
    .string({required_error:"email is required"})
    .trim()
    .email({message:"invalid email"})
    .min(10,{message:"email must be of 10 length"})
    .max(250,{message:"email must not be more than 250 length"}),

    phone:z
    .string({required_error:"phone is required"})
    .trim()
    .min(10,{message:"phone must be of 10 length"})
    .max(20,{message:"phone must not be more than 20 length"}),

    password:z
    .string({required_error:"password is required"})
    .trim()
    .min(7,{message:"password must be of 7 length"})
    .max(1024,{message:"password must not be more than 1024 length"}),
})

module.exports=signupschema;