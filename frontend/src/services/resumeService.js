import API from '../api/axios';
import axios from 'axios';

// 1. Get Presigned URL from our Backend
export const getPresignedUrl = async (file) => {
    const response = await API.post('/upload/presigned', {
        fileName: file.name,
        fileType: file.type
    });
    return response.data; // Returns { presignedUrl, fileKey }
};

// 2. Upload File to S3 (Directly)
export const uploadToS3 = async (presignedUrl, file) => {
    // IMPORTANT: We use a standard axios instance, NOT our API instance
    // because we don't want to send our Auth Header to AWS (it will reject it).
    const config = {
        headers: {
            'Content-Type': file.type
        }
    };
    
    await axios.put(presignedUrl, file, config);
};