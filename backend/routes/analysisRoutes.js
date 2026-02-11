const express = require('express');
const router = express.Router();
const { analyzeUserResume } = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, analyzeUserResume);

module.exports = router;