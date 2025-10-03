const Listing = require("../models/listing");
const Review = require("../models/review");
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geoCodingClient = mbxGeoCoding({accessToken:mapToken});
module.exports.index = async (req,res)=>{
   const allListings = await Listing.find({});
   res.render("listings/index.ejs",{allListings});
};

module.exports.showListing = async (req, res) => {
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
     return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.renderNewListing = (req, res) => {
  res.render("listings/new.ejs");
}

module.exports.createListing = async (req, res) => {
  try {
    let query = req.body.listing.location;
    let response = await geoCodingClient.forwardGeocode({
      query,
      limit: 2, // try getting more than 1 result
    }).send();

    let data = req.body.listing || req.body;

    // If user provided an image as a string, wrap it
    if (typeof data.image === "string" && data.image.trim() !== "") {
      data.image = {
        filename: "custom",
        url: data.image
      };
    }

    // If uploaded file exists
    if (req.file) {
      let url = req.file.path;
      let filename = req.file.filename;
      data.image = { url, filename };
    }

    const newListing = new Listing(data);
    newListing.owner = req.user._id;

    // Handle Mapbox response
    if (response.body.features.length) {
      // Take the first feature
      newListing.geometry = response.body.features[0].geometry;

      // Auto-fill a more precise location if city/state info exists
      const place = response.body.features[0].place_name; 
      newListing.location = place; // replaces user input with more accurate location
    } else {
      // fallback coordinates
      newListing.geometry = { type: "Point", coordinates: [0, 0] };
      req.flash("error", "Location not found. Map may not render properly.");
    }

    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing added");
    res.redirect("/listings");

  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong while creating the listing.");
    res.redirect("/listings/new");
  }
};

module.exports.editListings = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error","Listing you requested for does not exists!");
    res.redirect("/listings");
  }
  let originalImageURL = listing.image.url;
  originalImageURL =  originalImageURL.replace("/uploads/h_100,w_250");
  res.render("listings/edit.ejs", { listing ,originalImageURL});
}

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let data = req.body.listing;
  if (typeof data.image === "string" && data.image.trim() !== "") {
    data.image = { filename: "custom",   url: data.image };
  }
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
 if(typeof req.file !== "undefined"){
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image={ url , filename };
  await listing.save();
 }
  req.flash("success","Listing Updated");
  res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success","Listing Deleted");
  res.redirect("/listings");
}