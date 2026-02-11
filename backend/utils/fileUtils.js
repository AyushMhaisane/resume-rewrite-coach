const { GetObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/s3');
const pdf = require('pdf-parse');

// Helper: Convert AWS Stream to Buffer (Node.js doesn't do this automatically)
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
        // 1. Fetch file from S3
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey
        });
        const { Body } = await s3Client.send(command);

        // 2. Convert stream to buffer
        const pdfBuffer = await streamToBuffer(Body);

        // 3. Extract text
        const data = await pdf(pdfBuffer);
        return data.text;
    } catch (error) {
        console.error("Error reading PDF from S3:", error);
        throw new Error('Failed to extract text from resume');
    }
};

module.exports = { getTextFromS3 };