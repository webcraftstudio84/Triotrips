import React from 'react';

export const StatsBar: React.FC = () => {
  const stats = [
    {
      icon: 'fa-suitcase-rolling',
      num: '1200',
      suffix: '+',
      label: 'Happy Travelers'
    },
    {
      icon: 'fa-map-location-dot',
      num: '50',
      suffix: '+',
      label: 'Destinations'
    },
    {
      icon: 'fa-star',
      num: '4',
      suffix: ' Yrs',
      label: 'Experience'
    },
    {
      icon: 'fa-trophy',
      num: '98',
      suffix: '%',
      label: 'Satisfaction Rate'
    }
  ];

  return (
    <section className="stats-bar w-full" id="stats">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <i
                className={`fa-solid ${stat.icon} !text-[#fbff00]`}
                style={{ color: '#fbff00' }}
              ></i>
              <div>
                <span className="stat-num">{stat.num}</span>
                <span>{stat.suffix}</span>
              </div>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
