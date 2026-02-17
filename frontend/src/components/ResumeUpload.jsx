import { useState } from 'react';
import { getPresignedUrl, uploadToS3, analyzeResume } from '../services/resumeService'; // Import analyzeResume

const ResumeUpload = ({ onAnalysisComplete }) => { // Accept prop from Dashboard
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setStatus('idle');
            setMessage('');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setStatus('error');
            setMessage('Only PDF files are allowed.');
            return;
        }

        setStatus('uploading');

        try {
            // 1. Get Presigned URL
            setMessage('Getting permission...');
            const { presignedUrl, fileKey } = await getPresignedUrl(file);

            // 2. Upload to S3
            setMessage('Uploading to cloud...');
            await uploadToS3(presignedUrl, file);

            // 3. Analyze Resume (NEW STEP)
            setMessage('Analyzing with AI (this takes ~5 seconds)...');
            const analysisData = await analyzeResume(fileKey);

            // 4. Pass data up to Dashboard
            setStatus('success');
            onAnalysisComplete(analysisData);

        } catch (error) {
            console.error(error);
            setStatus('error');
            setMessage(error.response?.data?.message || 'Upload/Analysis failed.');
        }
    };

    return (
        // ... (Keep the exact same return JSX as before)
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Upload Your Resume</h3>

            <div className="space-y-4">
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                    "
                />

                <button
                    onClick={handleUpload}
                    disabled={!file || status === 'uploading'}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium transition
                        ${!file || status === 'uploading'
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {status === 'uploading' ? 'Processing...' : 'Analyze Resume'}
                </button>

                {/* Status Message */}
                {message && (
                    <div className={`mt-4 text-center text-sm p-2 rounded ${status === 'error' ? 'text-red-600 bg-red-50' :
                            status === 'success' ? 'text-green-600 bg-green-50' :
                                'text-blue-600 bg-blue-50'
                        }`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeUpload;