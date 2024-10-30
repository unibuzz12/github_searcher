import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";

const Header: React.FC = () => {
  const clearCache = async () => {
    try {
      // Send POST request to backend to clear Redis cache
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/clear-cache/`
      );
      toast.success(response.data.message); // Show backend response in alert
    } catch (error) {
      console.error("Failed to clear cache:", error);
      toast.error("Failed to clear cache. Please try again.");
    }
  };
  return (
    <>
      <div className="header">
        <div className="header-logo-text">
          <img src={logo} alt="header-logo" className="header-logo" />
          <div className="header-text">
            <p className="title">Github Searcher</p>
            <p className="subtitle">Search users or repositories below</p>
          </div>
        </div>
        <button className="clear-cache-btn" onClick={clearCache}>
          Clear
        </button>
      </div>
    </>
  );
};

export default Header;
