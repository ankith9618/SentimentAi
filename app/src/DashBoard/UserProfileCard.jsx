import React from "react";
import "./UserProfileCard.css";
import { useAuth0 } from "@auth0/auth0-react";

const UserProfileCard = () =>{
  const {user}  = useAuth0();

  return (
    <div className="user-profile-card">
      <div className="user-info">
        <div className="user-icon">👤</div>
        <div className="user-details">
          <h2>{user?.name}</h2>
          <p className="email">{user?.email}</p>
        </div>
      </div>
      <div className="pro-badge">Pro</div>
    </div>
  );
}

export default UserProfileCard;
