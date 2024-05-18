import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  let logoutTimer = null;

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:2000/auth/login", {
        email,
        password,
      });
      const { token } = response.data;
      const decodedToken = jwtDecode(token);
      
      setUser(decodedToken);
      setLogoutTimer(decodedToken.exp); 
      
      if (decodedToken.role === "user") {
        navigate("/");
      } else if (decodedToken.role === "organizer") {
        navigate("/organizer/dashboard");
      }else if(decodedToken.role === "admin"){
        navigate("/organizer/dashboard");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Invalid email or password. Please try again."); // Set error state here
    }
  };

  const logout = () => {
    clearTimeout(logoutTimer); 
    setUser(null);
    navigate("/");
  };

  const setLogoutTimer = (expirationTime) => {
    const currentTime = new Date().getTime();
    const expirationTimeMillis = new Date(expirationTime * 1000).getTime(); // Convert expiration time to milliseconds
    
    const timeUntilExpiration = expirationTimeMillis - currentTime;
    logoutTimer = setTimeout(logout, timeUntilExpiration);
  };

  useEffect(() => {
    if (user && user.exp) {
      setLogoutTimer(user.exp);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
