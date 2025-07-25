import React from 'react';
import './Stats.css';

export default function Stats() {
  // You might get these values via props or API in a real scenario; here they are hardcoded/sample.
  const stats = [
    {
      label: 'Comments Analyzed',
      value: '2,547,890+',
      barColor: 'linear-gradient(90deg, #5c00f2, #9d00ff)',
      progress: 0.8, // 80% filled
    },
    {
      label: 'Accuracy Rate',
      value: '97%',
      barColor: 'var(--color-success)',
      progress: 0.97,
    },
    {
      label: 'Platforms Supported',
      value: '3+',
      barColor: '#3b82f6', // blue
      progress: 0.5, // e.g., some visual fill
    },
  ];

  return (
    <section className="statsSection">
      <div className="container">
        {stats.map((stat, idx) => (
          <div key={idx} className="statCard">
            <div className="value">{stat.value}</div>
            <div className="label">{stat.label}</div>
            <div className="progressBarBackground">
              <div
                className="progressBarFill"
                style={{
                  width: `${Math.round(stat.progress * 100)}%`,
                  background: stat.barColor,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
