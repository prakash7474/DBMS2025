import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      {/* Add more details or actions */}
    </div>
  );
};

export default EventCard;
