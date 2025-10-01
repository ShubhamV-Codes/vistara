const Listing = require("../models/listing");
const Review = require("../models/review");

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
  let data = req.body.listing;

  // If user provided an image as a string, wrap it
  if (typeof data.image === "string" && data.image.trim() !== "") {
    data.image = {
      filename: "custom",  // or generate with Date.now()
      url: data.image
    };
  }
  let url = req.file.path;
  let filename = req.user._id;
  const newListing = new Listing(data);
  newListing.owner = req.user._id;
  newListing.image = {url,filename};
  await newListing.save();
  req.flash("success","New Listing added");
  res.redirect("/listings");
}

module.exports.editListings = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let data = req.body.listing;
  if (typeof data.image === "string" && data.image.trim() !== "") {
    data.image = { filename: "custom",   url: data.image };
  }
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success","Listing Updated");
  res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success","Listing Deleted");
  res.redirect("/listings");
}