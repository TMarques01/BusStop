// components/BusPin.js
import React from 'react';
import './BusPin.css'; // Criaremos este arquivo depois

function BusPin({ busNumber, time, streetName }) {
  return (
    <div className="bus-pin">
      <div className="bus-number">{busNumber}</div>
      <div className="bus-info">
        <div className="bus-time">{time}</div>
        <div className="bus-street">{streetName}</div>
      </div>
    </div>
  );
}

export default BusPin;