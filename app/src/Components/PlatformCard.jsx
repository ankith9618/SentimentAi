import React from "react";
import "./PlatformCard.css";

const PlatformCard = ({
  platform,
  title,
  description,
  icon,
  onClickFunction,
  isLive,
  isComingSoon,
  buttonClass,
}) => {
  return (
    <div className={`platform-card-sec ${isComingSoon ? "disabled" : ""}`}>
      <div className="card-header">
        <div className="left">
          {icon}
          <div>
            <h3 className="platform-name">{platform}</h3>
            <p className="platform-title">{title}</p>
          </div>
        </div>
        <span className={`status-badge ${isLive ? "live" : "soon"}`}>
          {isLive ? "Live" : "Coming Soon"}
        </span>
      </div>
      <p className="platform-desc">{description}</p>
      <button
        className={`start-btn ${buttonClass}`}
        disabled={isComingSoon}
        onClick={onClickFunction}
        
      >
        ▶ Start Analysis
      </button>
    </div>
  );
};

export default PlatformCard;
