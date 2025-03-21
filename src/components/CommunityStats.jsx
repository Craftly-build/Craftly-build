import React from 'react';
import { Users, ThumbsUp, Smile } from 'lucide-react';
import '../styles/communityStats.css';

const CommunityStats = () => {
  const stats = [
    {
      icon: <Users className="stat-icon" />,
      number: '2,500+',
      label: 'Skilled Artisans'
    },
    {
      icon: <ThumbsUp className="stat-icon" />,
      number: '7,800+',
      label: 'Successful Orders'
    },
    {
      icon: <Smile className="stat-icon" />,
      number: '10,000+',
      label: 'Satisfied Buyers'
    }
  ];

  return (
    <section className="community-stats">
      <div className="container">
        <h2 className="section-title">
          Craftly Community: Growing Strong Every Day
        </h2>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-icon-wrapper">
                {stat.icon}
              </div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <p>Join craftly today and be a part of something special!</p>
          <button className="join-button">Join Now</button>
        </div>
      </div>
    </section>
  );
};

export default CommunityStats;