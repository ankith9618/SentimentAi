// Loader.jsx
import React from "react";
import "./Loader.css"; // import styles

const Loader = ({message}) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <div className="message">{message}</div>
    </div>
  );
};

export default Loader;
