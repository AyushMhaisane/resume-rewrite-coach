const { getTextFromS3 } = require('../utils/fileUtils');
const { analyzeResume } = require('../services/aiService');
const User = require('../models/User');

// @desc    Analyze Resume
// @route   POST /api/analyze
// @access  Private
const analyzeUserResume = async (req, res) => {
    const { fileKey } = req.body; // Frontend sends this after upload

    if (!fileKey) {
        return res.status(400).json({ message: 'File key is required' });
    }

    try {
        // 1. Check Limits (Freemium Model)
        // If user is NOT Pro and has used > 3 attempts, block them.
        /* if (!req.user.isPro && req.user.practiceQuestionCount >= 3) {
            return res.status(403).json({ message: 'Free limit reached. Upgrade to Pro!' });
        }
        */

        // 2. Extract Text
        console.log("Downloading from S3...");
        const rawText = await getTextFromS3(fileKey);

        // 3. AI Analysis
        console.log("Sending to Gemini...");
        const analysis = await analyzeResume(rawText);

        // 4. Update Usage (Optional)
        // req.user.practiceQuestionCount += 1;
        // await req.user.save();

        res.json(analysis);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Analysis failed' });
    }
};

module.exports = { analyzeUserResume };