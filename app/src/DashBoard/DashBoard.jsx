import React from "react";
import "./DashBoard.css";
import DashboardHeader from "./DashboardHeader";
import UserProfileCard from "./UserProfileCard";
import StatsCards from "./StatsCards";
import PlatformAnalysis from "./PlatformAnalysis";



const Dashboard = () => {
  return (
    <div className="dashboard">
      <DashboardHeader />
      <UserProfileCard />
      <StatsCards />
      <PlatformAnalysis />
    </div>
  );
};

export default Dashboard;
