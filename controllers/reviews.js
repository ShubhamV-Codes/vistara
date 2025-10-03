const Review = require("../models/review");
const Listing = require("../models/listing");

// module.exports.addNewReview = async(req,res)=>{
//     console.log(req.params.id);
//    let listing =await Listing.findById(req.params.id)
//    let newReview = new Review(req.body.review);
//    newReview.author=req.user._id;
//    listing.reviews.push(newReview);  // ✅ associate review with listing
//    await newReview.save();
//    await listing.save();
//    req.flash("success","New Review Added");
//    res.redirect(`/listings/${listing._id}`);
// };

module.exports.addNewReview = async (req, res) => {
    const listingId = req.params.id;
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    await newReview.save();

    // Push review into listing without triggering full schema validation
    await Listing.findByIdAndUpdate(listingId, { $push: { reviews: newReview._id } });

    req.flash("success", "New Review Added");
    res.redirect(`/listings/${listingId}`);
};


module.exports.destroyReview = async(req,res)=>{
  let{id,reviewId}=req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
 await Review.findByIdAndDelete(reviewId);
 req.flash("success","Review Deleted");
 res.redirect(`/listings/${id}`);
};

