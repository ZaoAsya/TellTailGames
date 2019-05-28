import React from 'react';
import './index.css';

interface AchieveProps {
  picture: string;
  name: string;
}

export const AchieveComponent = ({picture, name}: AchieveProps) => {
  return (
    <section className="achieves-item">
      <div className="achieves-item__pic"
           style={{backgroundImage: 'url(' + picture + ')'}} />
      <section className="achieves-item__info">
        <p className="achieves-item__info-desc">Достижение получено</p>
        <p className="achieves-item__info-name">{ name }</p>
      </section>
    </section>
  );
};
