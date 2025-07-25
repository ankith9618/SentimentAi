import React from 'react';
import './DemoPreview.css';
import { FaCommentDots, FaChartLine } from 'react-icons/fa';

export default function DemoPreview() {
  // In a live app, you would feed real data. Here, sample/hardcoded.
  const demoStats = [
    { label: 'Positive', value: 68, color: 'var(--color-primary)' },
    { label: 'Neutral', value: 24, color: 'var(--color-neutral)' },
    { label: 'Negative', value: 8, color: 'var(--color-error)' },
  ];
  const latestComment = {
    text: 'This video was absolutely amazing! Really helped me understand the concept better 👏',
    sentiment: 'Positive',
    confidence: 92,
    timeAgo: '0.8s ago',
  };

  return (
    <section id="demo" className="demoSection">
      <div className="card">
        <h2 className="title">See It In Action</h2>
        <p className="subtitle">Real-time sentiment analysis dashboard preview</p>

        <div className="statsRow">
          {demoStats.map((stat, idx) => (
            <div key={idx} className="statItem">
              <div
                className="value"
                style={{ color: stat.color }}
              >
                {stat.value}%
              </div>
              <div className="label">{stat.label}</div>
              <div className="progressBg">
                <div
                  className="progressFill"
                  style={{
                    width: `${stat.value}%`,
                    background: stat.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="commentCard">
          <FaCommentDots className="commentIcon" size={20} />
          <div className="commentContent">
            <p className="commentText">"{latestComment.text}"</p>
            <div className="commentMeta">
              <span
                className="sentimentBadge"
                style={{
                  background:
                    latestComment.sentiment === 'Positive'
                      ? 'var(--color-success)'
                      : latestComment.sentiment === 'Negative'
                      ? 'var(--color-error)'
                      : 'var(--color-neutral)',
                }}
              >
                {latestComment.sentiment} • {latestComment.confidence}% confidence
              </span>
              <span className="timeAgo">Analyzed {latestComment.timeAgo}</span>
            </div>
          </div>
        </div>

        <button className={`$"btn} $"primaryBtn}`}>
          <FaChartLine style={{ marginRight: '0.5rem' }} /> Start Your Analysis
        </button>
      </div>
    </section>
  );
}
