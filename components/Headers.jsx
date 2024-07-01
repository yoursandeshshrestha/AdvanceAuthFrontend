import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Header.css";

function Headers() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="Header-Container">
      <h1>Authentication & Authorization</h1>
      <div className="profile-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          alt="Profile Picture"
          onClick={toggleDropdown}
          className="profile-picture"
        />
        {dropdownVisible && (
          <div className="dropdown-menu">
            <button onClick={signOut} className="signout-button">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Headers;
