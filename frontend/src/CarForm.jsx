// CarForm.jsx
import './CarForm.css';
import React from 'react';

const CarForm = ({ vehicleNumber, setVehicleNumber, parkingSpot, setParkingSpot, parkingLot, setParkingLot, checkAvailability }) => (
  <div className="input-container">
    <input
      type="text"
      placeholder="Enter Vehicle ID"
      value={vehicleNumber}
      onChange={(e) => setVehicleNumber(e.target.value)}
    />
    <input
      type="text"
      placeholder="Enter Parking Spot ID"
      value={parkingSpot}
      onChange={(e) => setParkingSpot(e.target.value)}
    />
    <input
      type="text"
      placeholder='Enter Parking Lot ID'
      value={parkingLot}
      onChange={(e) => setParkingLot(e.target.value)}
    />
    <button id='availability' onClick={checkAvailability}>Check Availability</button>
  </div>
);

export default CarForm;
