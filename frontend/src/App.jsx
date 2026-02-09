import { useContext } from "react";
import AuthContext from "./context/AuthContext";

function App() {
  const { user, login, logout } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      // Hardcoded test credentials (change these to match your DB)
      await login("ayush@test.com", "123456"); 
      alert("Logged in successfully!");
    } catch (error) {
      alert("Login Failed!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4">
      <h1 className="text-4xl font-bold text-blue-600">Resume Coach 🚀</h1>
      
      {user ? (
        <div className="text-center">
          <p className="text-xl">Welcome back, <span className="font-bold">{user.name}</span>!</p>
          <button 
            onClick={logout}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl">You are Guest</p>
          <button 
            onClick={handleLogin}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Test Login (Ayush)
          </button>
        </div>
      )}
    </div>
  );
}

export default App;