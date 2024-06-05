import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
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
      const response = await axios.post("https://tours-api-7hh1.onrender.com/auth/login", {
        email,
        password,
      });
      const { token } = response.data;
      const decodedToken = jwtDecode(token);

      setUser(decodedToken);
      localStorage.setItem('token', token); // Store token in local storage

      // Get role from the decoded token
      const { role } = decodedToken;

      // Navigate based on role
      if (role === "user") {
        navigate("/");
      } else if (role === "organizer") {
        navigate("/organizer/dashboard");
      } else if (role === "admin") {
        navigate("/organizer/dashboard");
      }

      setLogoutTimer(decodedToken.exp);
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  const logout = () => {
    clearTimeout(logoutTimer);
    setUser(null);
    localStorage.removeItem('token'); // Remove token from local storage
    navigate("/");
  };

  const setLogoutTimer = (expirationTime) => {
    const currentTime = new Date().getTime();
    const expirationTimeMillis = new Date(expirationTime * 1000).getTime(); // Convert expiration time to milliseconds

    const timeUntilExpiration = expirationTimeMillis - currentTime;
    logoutTimer = setTimeout(logout, timeUntilExpiration);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > new Date().getTime()) {
          setUser(decodedToken);
          setLogoutTimer(decodedToken.exp);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem('token');
      }
    }
  }, []);

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
