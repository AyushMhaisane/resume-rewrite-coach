import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

// 1. Create the Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 2. Check if user is already logged in (on page refresh)
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // 3. Login Action
    const login = async (email, password) => {
        const res = await API.post("/auth/login", { email, password });
        // Save to LocalStorage
        localStorage.setItem("user", JSON.stringify(res.data));
        // Save to State
        setUser(res.data);
        return res.data;
    };

    // 4. Register Action
    const register = async (name, email, password) => {
        const res = await API.post("/auth/register", { name, email, password });
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        return res.data;
    };

    // 5. Logout Action
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    // 6. Expose data to the rest of the app
    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;