import API from '../api/axios';
import axios from 'axios';

export const getPresignedUrl = async (file) => {
    const response = await API.post('/upload/presigned', {
        fileName: file.name,
        fileType: file.type
    });
    return response.data; 
};

export const uploadToS3 = async (presignedUrl, file) => {
    const config = {
        headers: {
            'Content-Type': file.type
        }
    };
    await axios.put(presignedUrl, file, config);
};

// --- ADD THIS NEW FUNCTION ---
export const analyzeResume = async (fileKey) => {
    const response = await API.post('/analyze', { fileKey });
    return response.data; // Returns the JSON from Gemini
};