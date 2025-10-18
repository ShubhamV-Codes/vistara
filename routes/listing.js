const express= require("express");


const router =express.Router({mergeParams:true});
const wrapAsync =require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing,}=require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage })

router
.route("/")
.get(wrapAsync(listingController.index))
.post( isLoggedIn ,  upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));


router.get("/new",isLoggedIn, listingController.renderNewListing );
router.get("/search",isLoggedIn , listingController.searchByLocation);

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn , isOwner, validateListing,upload.single('listing[image]'),wrapAsync(listingController.updateListing))
.delete( isLoggedIn ,isOwner , wrapAsync(listingController.deleteListing));

  
router.get("/:id/edit", isLoggedIn, isOwner, upload.single('listing[image]'), wrapAsync(listingController.editListings));
router.get("/profile", isLoggedIn, async (req, res) => {
  res.render("profile.ejs", { currUser: req.user });
});

module.exports = router;