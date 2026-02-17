const AnalysisResult = ({ data, onReset }) => {
    // data = { score, summary, strengths, weaknesses, suggestions }

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto space-y-8 animate-fade-in">

            {/* Header Section */}
            <div className="flex justify-between items-center border-b pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Analysis Report</h2>
                    <p className="text-gray-500">AI-Generated Career Critique</p>
                </div>
                <div className={`text-4xl font-bold ${data.score >= 80 ? 'text-green-600' :
                        data.score >= 50 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                    {data.score}/100
                </div>
            </div>

            {/* Summary */}
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-800 mb-2">Professional Summary</h3>
                <p className="text-gray-700">{data.summary}</p>
            </div>

            {/* Grid Layout for Pros/Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Strengths */}
                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                    <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                        ✅ Strengths
                    </h3>
                    <ul className="space-y-2">
                        {data.strengths.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700">
                                <span className="mt-1 text-green-500">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                    <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                        ⚠️ Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                        {data.weaknesses.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700">
                                <span className="mt-1 text-red-500">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Actionable Advice */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-4">💡 Recommended Actions</h3>
                <ul className="space-y-3">
                    {data.suggestions.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 bg-white p-3 rounded shadow-sm">
                            <span className="font-bold text-blue-600">{index + 1}.</span>
                            <span className="text-gray-700">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <button
                onClick={onReset}
                className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition font-medium"
            >
                Upload Another Resume
            </button>
        </div>
    );
};

export default AnalysisResult;