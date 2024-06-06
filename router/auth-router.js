// A Router instance is a middlewere, complete routing system. For this reason, it is often referred as to "Mini-app";

const express=require("express");
const router=express.Router();
// const {home}=require("../controller/auth-controller");
// const {registar}=require("../controller/auth-controller");
// Simply dclare like this.
const authcontroller=require("../controller/auth-controller");
const signupschema=require("../validators/auth-validator");
const validate=require("../middlewere/validate-middlewere");
const authmiddleware=require("../middlewere/auth-middleware");



// router.route("/").get((req,res)=>{
//     res.status(200).send("welcome to mern series by using router ");

// })
//ALTERNATIVE way of using it.
// router.get("/",(req,res)=>{
//     res.status(200).send("welcome to mern series by using router");
// });

router.route("/").get(authcontroller.home);
router
.route("/registar")
.post(validate(signupschema), authcontroller.registar);
// first validate signup schema, then call authcontroller.register.
router.route("/login").post(authcontroller.login);
router.route("/user").get(authmiddleware,authcontroller.user);








module.exports= router;