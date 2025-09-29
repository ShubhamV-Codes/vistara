const express = require('express');
const router = express.Router();
const Listing = require("../models/listing.js");

// Privacy Page
router.get('/privacy', (req, res) => {
    res.render('listings/privacy');
});

// Terms Page
router.get('/terms', (req, res) => {
    res.render('listings/terms');
});

module.exports = router;
