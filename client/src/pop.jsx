import React from 'react';

const Popup = ({ handleDeleteTrue, handleDeleteFalse }) => {
  return (
    <div className="popup-container">
      <p>Are you sure you want to delete?</p>
      <button onClick={handleDeleteTrue}>Yes</button>
      <button onClick={handleDeleteFalse}>No</button>
    </div>
  );
};

export default Popup;