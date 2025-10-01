const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const userController = require("../controllers/users");

router
.route("/signup")
.get(userController.signupUserGET )
.post(wrapAsync(userController.signupUserPOST));

router
.route("/login")
.get(userController.loginUserGET)
.post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),userController.loginUserPOST);
 
router.get("/logout",userController.logoutUser);

module.exports = router;
