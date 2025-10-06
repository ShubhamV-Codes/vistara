const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const { isLoggedIn } = require('../middleware'); // assuming you already have this

// GET /profile
router.get('/profile', isLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all listings created by this user
    const listings = await Listing.find({ owner: userId }).populate('owner');

    res.render('listings/profile', { user: req.user, listings });
  } catch (err) {
    console.error('Error loading profile page:', err);
    res.status(500).send('Server error loading profile');
  }
});

module.exports = router;
