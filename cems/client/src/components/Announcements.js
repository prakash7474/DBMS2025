import React from 'react';

const Announcements = ({ announcements }) => {
  return (
    <div>
      <h3>Announcements</h3>
      {announcements.map(ann => (
        <div key={ann.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <h4>{ann.title}</h4>
          <p>{ann.content}</p>
          <small>{new Date(ann.created_at).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
};

export default Announcements;
