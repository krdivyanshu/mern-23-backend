const express=require("express");
const admincontroller=require("../controller/admin-controller");
const authmiddleware=require("../middlewere/auth-middleware");
const adminmiddlewere=require("../middlewere/admin-middlewere");
const router=express.Router();


router.route("/users").get(authmiddleware,adminmiddlewere,admincontroller.getallusers);
router.route("/users/delete/:id").delete(authmiddleware,adminmiddlewere,admincontroller.deleteuserbyid);
router.route("/users/:id").get(authmiddleware,adminmiddlewere,admincontroller.getuserbyid);
router.route("/users/update/:id").patch(authmiddleware,adminmiddlewere,admincontroller.updateuserbyid);
router.route("/contacts").get(admincontroller.getallcontacts);
router.route("/contacts/delete/:id").delete(authmiddleware,adminmiddlewere,admincontroller.deletecontactbyid);

module.exports=router;