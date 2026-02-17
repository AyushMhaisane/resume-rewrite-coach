import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import ResumeUpload from "../components/ResumeUpload";
import AnalysisResult from "../components/AnalysisResult"; // Import

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [analysisData, setAnalysisData] = useState(null); // Store AI results

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        <button
          onClick={logout}
          className="bg-white border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">

        {/* CONDITIONAL RENDERING */}
        {!analysisData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              {/* Pass the function to save data when done */}
              <ResumeUpload onAnalysisComplete={(data) => setAnalysisData(data)} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">How it works</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex gap-3">
                  <span className="bg-blue-100 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  Upload your resume (PDF)
                </li>
                <li className="flex gap-3">
                  <span className="bg-blue-100 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  AI analyzes structure & keywords
                </li>
                <li className="flex gap-3">
                  <span className="bg-blue-100 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                  Get actionable feedback instantly
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // Show Results when data exists
          <AnalysisResult
            data={analysisData}
            onReset={() => setAnalysisData(null)}
          />
        )}

      </div>
    </div>
  );
};

export default Dashboard;