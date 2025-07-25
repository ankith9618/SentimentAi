import React from 'react';
import './Features.css';
import { FaBolt, FaChartLine, FaGlobe } from 'react-icons/fa';

export default function Features() {
  const features = [
    {
      icon: <FaBolt />,
      iconBg: 'linear-gradient(135deg, #a855f7, #ec4899)',
      hoverBg: 'linear-gradient(135deg, #f3e8ff, #fff1f2)',
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning models analyze sentiment with 97% accuracy',
      badge: '97% Accuracy',
    },
    {
      icon: <FaChartLine />,
      iconBg: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      hoverBg: 'linear-gradient(135deg, #dbeafe, #ecfeff)',
      title: 'Real-time Insights',
      description: 'Get instant sentiment analysis and trending emotion patterns',
      badge: '<100ms Response',
    },
    {
      icon: <FaGlobe />,
      iconBg: 'linear-gradient(135deg, #10b981, #3b82f6)',
      hoverBg: 'linear-gradient(135deg, #d1fae5, #dbeafe)',
      title: 'Multi-Platform Support',
      description: 'Analyze comments across YouTube, Twitter, Instagram and more',
      badge: null,
    },
  ];

  return (
    <section className="features-section">
      <div className="features-header">
        <h2>Powerful Features for <span>Modern Analysis</span></h2>
        <p>Everything you need to understand and analyze sentiment at scale</p>
      </div>
      <div className="features-cards">
        {features.map((feat, index) => (
          <div
            className="feature-card"
            key={index}
            style={{ '--hover-bg': feat.hoverBg }}
          >
            <div className="icon" style={{ backgroundImage: feat.iconBg }}>
              {feat.icon}
            </div>
            <h3>{feat.title}</h3>
            {feat.badge && <div className="badge">{feat.badge}</div>}
            <p>{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
