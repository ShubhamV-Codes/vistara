const express = require('express');
const router = express.Router();
const pageController = require("../controllers/pages");

// Privacy Page
router.get('/privacy', pageController.privacyPage );

// Terms Page
router.get('/terms',pageController.termPage);

module.exports = router;
