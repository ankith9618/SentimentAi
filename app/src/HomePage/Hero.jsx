import React from 'react';
import './Hero.css';
import { NavLink } from 'react-router-dom';

export default function Hero() {
  return (
    <section id="home" className="heroSection">
      <div className="overlay">
        {/* Optional: animated background dots via CSS or a canvas */}
      </div>
      <div className="content">
        <span className="badge">✨ Powered by Advanced AI</span>
        <h1 className="title">
          <span className="gradientText">Sentiment Analysis</span> Reimagined
        </h1>
        <p className="subtitle">
          Unlock the emotional intelligence hidden in social media comments. Our AI-powered platform provides real-time sentiment analysis across multiple platforms.
        </p>
        <div className="buttons">
            <NavLink to="/platform" className="btn primaryBtn">
            Start Analyzing →</NavLink>
          <button className="btn outlineBtn">View Demo</button>
        </div>
      </div>
    </section>
  );
}
