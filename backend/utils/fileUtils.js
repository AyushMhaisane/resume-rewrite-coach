const { GetObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/s3');
const pdf = require('pdf-parse'); // This will now map to the correct library

// Helper: Convert AWS Stream to Buffer
const streamToBuffer = (stream) => {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
};

const getTextFromS3 = async (fileKey) => {
    try {
        console.log("Downloading from S3:", fileKey);
        
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey
        });
        const { Body } = await s3Client.send(command);

        // Convert stream to buffer
        const pdfBuffer = await streamToBuffer(Body);

        // Extract text
        console.log("Parsing PDF...");
        const data = await pdf(pdfBuffer);
        
        console.log("Success! Extracted characters:", data.text.length);
        return data.text;

    } catch (error) {
        console.error("Error reading PDF from S3:", error);
        throw new Error('Failed to extract text from resume');
    }
};

module.exports = { getTextFromS3 };