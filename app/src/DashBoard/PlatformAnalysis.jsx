import React from "react";
import "./PlatformAnalysis.css";
import { FaYoutube, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";

const platforms = [
  {
    name: "YouTube",
    icon: <FaYoutube className="platform-icon youtube" />,
    comments: "45,623",
    posts: "234",
    growth: "+12.5%",
    sentiment: { pos: 61.4, neg: 26.3, neutral: 12.3 },
    type: "Videos",
  },
  {
    name: "Twitter",
    icon: <FaTwitter className="platform-icon twitter" />,
    comments: "38,294",
    posts: "892",
    growth: "-3.2%",
    sentiment: { pos: 47.0, neg: 39.2, neutral: 13.8 },
    type: "Posts",
  },
  {
    name: "Instagram",
    icon: <FaInstagram className="platform-icon instagram" />,
    comments: "32,156",
    posts: "456",
    growth: "+8.7%",
    sentiment: { pos: 68.4, neg: 21.8, neutral: 9.8 },
    type: "Posts",
  },
  {
    name: "Facebook",
    icon: <FaFacebook className="platform-icon facebook" />,
    comments: "9,774",
    posts: "123",
    growth: "+2.1%",
    sentiment: { pos: 51.2, neg: 30.7, neutral: 18.2 },
    type: "Posts",
  },
];

const PlatformAnalysis = () => (
  <div className="dash-platform-section">
    <h2>Platform Analysis</h2>
    <div className="dash-platform-grid">
      {platforms.map((p, i) => (
        <div className="dash-platform-card" key={i}>
          <div className="dash-platform-header">
            <div className="dash-platform-left">
              {p.icon}
              <span className="dash-platform-name">{p.name}</span>
            </div>
            <div className="dash-growth-pill">
              <FiTrendingUp />
              {p.growth}
            </div>
          </div>

          <div className="dash-platform-stat">
            <h3>{p.comments}</h3>
            <p>Comments Analyzed</p>
          </div>

          <div className="dash-platform-stat">
            <h4>{p.posts}</h4>
            <p>{p.type} Analyzed</p>
          </div>

          <div className="sentiment-header">Sentiment Analysis</div>
          <div className="sentiment-row">
            <span className="positive">👍 {p.sentiment.pos}%</span>
            <span className="negative">👎 {p.sentiment.neg}%</span>
            <span className="neutral">— {p.sentiment.neutral}%</span>
          </div>
          <div className="sentiment-bar">
            <div
              className="bar positive-bar"
              style={{ width: `${p.sentiment.pos}%` }}
            ></div>
            <div
              className="bar negative-bar"
              style={{ width: `${p.sentiment.neg}%` }}
            ></div>
            <div
              className="bar neutral-bar"
              style={{ width: `${p.sentiment.neutral}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PlatformAnalysis;
