const express = require('express');
const router = express.Router();
const { generatePresignedUrl } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

// Only logged-in users can upload
router.post('/presigned', protect, generatePresignedUrl);

module.exports = router;