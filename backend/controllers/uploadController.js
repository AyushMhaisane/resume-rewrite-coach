const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const s3Client = require('../config/s3');
const { v4: uuidv4 } = require('uuid'); // You might need to install uuid: npm install uuid

// @desc    Generate Presigned URL for upload
// @route   POST /api/upload/presigned
// @access  Private
const generatePresignedUrl = async (req, res) => {
    try {
        const { fileName, fileType } = req.body;
        const userId = req.user._id;

        // Create a unique file path: users/USER_ID/RANDOM_ID.pdf
        const fileKey = `resumes/${userId}/${uuidv4()}.pdf`;

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey,
            ContentType: fileType
        });

        // Generate the URL (valid for 5 minutes)
        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

        res.json({
            presignedUrl,
            fileKey // Save this key! You'll need it to find the file later.
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error generating upload URL' });
    }
};

module.exports = { generatePresignedUrl };