import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome, {user?.name}!</p>
      <button 
        onClick={logout} 
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;