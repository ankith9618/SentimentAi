import React from "react";
import "./StatsCards.css";
import { FaComments, FaUsers, FaChartLine, FaChartPie } from "react-icons/fa";

const stats = [
  {
    title: "Comments Today",
    value: "2,847",
    subtext: "Analyzed in the last 24 hours",
    change: "+5.4%",
    icon: <FaComments className="card-icon" />,
  },
  {
    title: "Active Users",
    value: "15,623",
    subtext: "Tracked across platforms",
    change: "+2.1%",
    icon: <FaUsers className="card-icon" />,
  },
  {
    title: "Avg Sentiment",
    value: "73.2%",
    subtext: "Positive sentiment score",
    change: "+1.8%",
    icon: <FaChartLine className="card-icon" />,
  },
  {
    title: "Active Analysis",
    value: "12",
    subtext: "Currently running",
    change: "",
    icon: <FaChartPie className="card-icon" />,
  },
];

const StatsCards = () => (
  <div className="stats-grid">
    {stats.map((stat, i) => (
      <div key={i} className="stat-card">
        <h3>{stat.title}</h3>
        <div className="stat-row">
          <p className="value">{stat.value}</p>
          {stat.icon}
        </div>
        <p className="subtext">{stat.subtext}</p>
        {stat.change && (
          <p className="change">{stat.change} from previous</p>
        )}
      </div>
    ))}
  </div>
);

export default StatsCards;
