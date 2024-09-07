import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav>
      <div className="navbar">
        <div className="logo">
          <Link to="/">Task Manager</Link>
        </div>
        <ul className="menu">
          {/* Conditional rendering based on login status */}
          {auth ? (
            <li>
              <button className="delete-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
