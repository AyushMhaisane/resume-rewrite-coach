import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ResumeUpload from "../components/ResumeUpload"; // <--- Import

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Upload */}
            <div>
                <ResumeUpload />
            </div>

            {/* Right Column: Stats / Info (Placeholder) */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Stats</h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Plan</span>
                        <span className="font-bold text-green-600">{user?.isPro ? 'PRO' : 'Free'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Resumes Analyzed</span>
                        <span className="font-bold">0</span>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;