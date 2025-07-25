import React from 'react';
import './Platforms.css';
import { FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Platforms() {
  const platforms = [
    {
      name: 'YouTube',
      icon: <FaYoutube size={28} />,
      iconBg: 'linear-gradient(135deg, #FF0000, #cc0000)',
      hoverBg: 'linear-gradient(135deg, #ffe4e4, #fffafa)',
      ringColor: '#ff0000',
      status: 'Live',
      enabled: true,
    },
    {
      name: 'Twitter',
      icon: <FaTwitter size={28} />,
      iconBg: 'linear-gradient(135deg, #1DA1F2, #0d8ddb)',
      hoverBg: 'linear-gradient(135deg, #e0f2fe, #f0f9ff)',
      ringColor: '#1DA1F2',
      status: 'Coming Soon',
      enabled: false,
    },
    {
      name: 'Instagram',
      icon: <FaInstagram size={28} />,
      iconBg: 'linear-gradient(135deg, #E4405F, #d12a4a)',
      hoverBg: 'linear-gradient(135deg, #fde2e4, #fff1f2)',
      ringColor: '#E4405F',
      status: 'Coming Soon',
      enabled: false,
    },
  ];

  return (
    <section className="platforms-section">
      <div className="platforms-header">
        <h2>Connect Your Favorite <span>Platforms</span></h2>
        <p>Start with YouTube and expand to analyze sentiment across all major social platforms</p>
      </div>
      <div className="platforms-cards">
        {platforms.map((plat, index) => (
          <div
            className={`platform-card ${plat.enabled ? 'enabled' : 'disabled'}`}
            key={index}
            style={{ '--hover-bg': plat.hoverBg }}
          >
            <div
              className="icon"
              style={{
                backgroundImage: plat.iconBg,
                boxShadow: `0 0 12px ${plat.ringColor}`,
              }}
            >
              {plat.icon}
            </div>
            <h3>{plat.name}</h3>
            <div className="badge">
              {plat.enabled ? 'Live' : 'Coming Soon'}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
