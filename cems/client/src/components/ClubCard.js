import React from 'react';

const ClubCard = ({ club }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{club.name}</h3>
      <p>{club.description}</p>
      {/* Add more details or actions */}
    </div>
  );
};

export default ClubCard;
