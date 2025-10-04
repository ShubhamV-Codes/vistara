
const Listing = require("../models/listing");
const Review = require("../models/review");
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geoCodingClient = mbxGeoCoding({ accessToken: mapToken });

// List all listings, optionally filter by category
module.exports.index = async (req, res) => {
  const { category, search } = req.query;
  let query = {};

  if (category) query.category = category;

  if (search && search.trim() !== '') {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const allListings = await Listing.find(query);
  
  // always send searchQuery, even if undefined
  res.render('listings/index.ejs', { allListings, category, searchQuery: search || '' });
};


// Show a single listing
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing doesn't exist");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// Render form for creating new listing
module.exports.renderNewListing = (req, res) => {
  res.render("listings/new.ejs");
};

// Create a new listing
module.exports.createListing = async (req, res) => {
  try {
    console.log("===== FORM DATA RECEIVED =====");
    console.log("Full body:", JSON.stringify(req.body, null, 2));
    console.log("Category specifically:", req.body.listing?.category);
    console.log("===============================");

    const data = req.body.listing;

    // Handle image input
    if (req.file) {
      data.image = { url: req.file.path, filename: req.file.filename };
    } else if (typeof data.image === "string" && data.image.trim() !== "") {
      data.image = { filename: "custom", url: data.image };
    }

    const newListing = new Listing(data);
    newListing.owner = req.user._id;

    const response = await geoCodingClient.forwardGeocode({
      query: data.location,
      limit: 2,
    }).send();

    if (response.body.features.length) {
      newListing.geometry = response.body.features[0].geometry;
      newListing.location = response.body.features[0].place_name;
    } else {
      newListing.geometry = { type: "Point", coordinates: [0, 0] };
      req.flash("error", "Location not found. Map may not render properly.");
    }

    await newListing.save();
    req.flash("success", "New Listing added");
    res.redirect("/listings");
  } catch (err) {
    console.log("===== ERROR OCCURRED =====");
    console.log("Error name:", err.name);
    console.log("Error message:", err.message);
    console.log("Full error:", err);
    console.log("=========================");
    req.flash("error", "Something went wrong while creating the listing.");
    res.redirect("/listings/new");
  }
};
// Render edit form
module.exports.editListings = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  const originalImageURL = listing.image?.url?.replace("/uploads/h_100,w_250", "");
  res.render("listings/edit.ejs", { listing, originalImageURL });
};

// Update an existing listing
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const data = req.body.listing;

  // Handle image upload
  if (req.file) {
    data.image = { url: req.file.path, filename: req.file.filename };
  } else if (typeof data.image === "string" && data.image.trim() !== "") {
    data.image = { filename: "custom", url: data.image };
  }

  try {
    // Update listing with validation
    await Listing.findByIdAndUpdate(id, data, { runValidators: true, new: true });
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong while updating the listing.");
    res.redirect(`/listings/${id}/edit`);
  }
};

// Delete a listing
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
