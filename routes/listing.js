const express= require("express");
const router =express.Router({mergeParams:true});
const wrapAsync =require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing,}=require("../middleware.js");



//Index Route
router.get("/",wrapAsync(async (req,res)=>{
   console.log("REQ.USER:", req.user); 
   const allListings = await Listing.find({});
   res.render("listings/index.ejs",{allListings});

}));

//New Route
router.get("/new",isLoggedIn,  (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
router.get("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
  .populate({
    path:"reviews",
    populate:{
      path:"author",
    },
  })
    .populate("owner");
  if(!listing){
    req.flash("error","Listing doesn't exists");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
}));

// Create Route
router.post("/", validateListing, isLoggedIn , wrapAsync(async (req, res) => {
  let data = req.body.listing;

  // If user provided an image as a string, wrap it
  if (typeof data.image === "string" && data.image.trim() !== "") {
    data.image = {
      filename: "custom",  // or generate with Date.now()
      url: data.image
    };
  }

  const newListing = new Listing(data);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success","New Listing added");
  res.redirect("/listings");
}));


//Edit Route  
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  req.flash("success","Listing Edited");
  res.render("listings/edit.ejs", { listing });
}));

//Update Route 
router.put("/:id",isLoggedIn , isOwner, validateListing, wrapAsync(async (req, res) => {
  let { id } = req.params;
  let data = req.body.listing;
  if (typeof data.image === "string" && data.image.trim() !== "") {
    data.image = { filename: "custom",   url: data.image };
  }
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success","Listing Updated");
  res.redirect(`/listings/${id}`);
}));

//Delete Route , 

router.delete("/:id", isLoggedIn ,isOwner , wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success","Listing Deleted");
  res.redirect("/listings");
}));

module.exports = router;