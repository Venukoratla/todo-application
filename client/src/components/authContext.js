import React, { createContext, useState, useContext } from "react";

// Create a context with default value of undefined
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  // Function to login
  const login = (token) => {
    // Set the token in sessionStorage or localStorage
    sessionStorage.setItem("token", token);
    setAuth(true);
  };

  // Function to logout
  const logout = () => {
    sessionStorage.removeItem("token");
    setAuth(false);
  };

  // Provide the context value
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
