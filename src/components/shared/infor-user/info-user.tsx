import React from 'react';
import './info-user.css'; 

interface InfoUserProps {
  name: string;
  date: string;
}

const InfoUser: React.FC<InfoUserProps> = ({ name, date }) => {
  return (
    <div className="info-user-container">
      <span className="info-user-name">{name}</span>
      <span className="info-user-date">{date}</span>
    </div>
  );
};

export default InfoUser;