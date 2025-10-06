const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl, isLoggedIn}=require("../middleware.js");
const userController = require("../controllers/users");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

router
.route("/signup")
.get(userController.signupUserGET )
.post(wrapAsync(userController.signupUserPOST));

router
.route("/login")
.get(userController.loginUserGET)
.post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),userController.loginUserPOST);
 
router.get("/logout",userController.logoutUser);

// API endpoint to get user's listings

router.get("/api/user/listings", isLoggedIn, wrapAsync(async (req, res) => {
    try {
        const listings = await Listing.find({ owner: req.user._id })
            .select('title price image location _id')
            .sort({ _id: -1 });
        
        res.json(listings);
    } catch (error) {
        console.error('Error fetching user listings:', error);
        res.status(500).json({ error: 'Failed to fetch listings' });
    }
}));





module.exports = router;