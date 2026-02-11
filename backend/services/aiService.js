const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeResume = async (resumeText) => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const prompt = `
    You are an expert Technical Recruiter and Career Coach. 
    Analyze the following resume text.
    
    Resume Text:
    "${resumeText}"
    
    Output strictly in JSON format with the following structure:
    {
        "score": (number 1-100),
        "summary": "2 sentence professional summary of the candidate",
        "strengths": ["bullet point 1", "bullet point 2"],
        "weaknesses": ["bullet point 1", "bullet point 2"],
        "suggestions": ["specific actionable advice 1", "advice 2"]
    }
    Do not use markdown formatting (like \`\`\`json). Just return the raw JSON string.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown if Gemini adds it accidentally
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanText);
    } catch (error) {
        console.error("AI Error:", error);
        throw new Error('AI Analysis failed');
    }
};

module.exports = { analyzeResume };