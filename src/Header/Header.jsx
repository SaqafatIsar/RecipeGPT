import React from "react";
import chefImage from "../Images/chef-image.png";
import './Header.css';
import { auth } from "../firebase";  // Import Firebase auth
import { signOut } from "firebase/auth";  // Import signOut method from Firebase
import { useNavigate } from "react-router-dom";  // For navigation after logout
import { Link } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate(); // For navigation

  const handleLogout = async () => {
    try {
      await signOut(auth); // Logs out the current user from Firebase
      console.log("User logged out");
      navigate("/login"); // Redirects to the login page after logging out
    } catch (error) {
      console.error("Error logging out:", error.message); // Logs any error during logout
    }
  };

  return (
    <header>
    <Link to="/saved" className="saved-link">Saved Recipes</Link>
  
    <div className="logo-container">
      <img src={chefImage} alt="Chef" />
      <h2>RecipeGPT</h2>
    </div>
  
    <button onClick={handleLogout} className="logout-btn">Logout</button>
  </header>
  
  );
}
