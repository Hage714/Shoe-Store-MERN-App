const express = require('express');
const { protect } = require('../middleware/protectmiddleware');
const { getUserProfile, updateUserProfile } = require('../controllers/editprofile');
const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;
