// CarForm.jsx
import React from 'react';

const CarForm = ({ vehicleNumber, setVehicleNumber, parkingSpot, setParkingSpot }) => (
  <div className="input-container">
    <input
      type="text"
      placeholder="Enter Vehicle Number"
      value={vehicleNumber}
      onChange={(e) => setVehicleNumber(e.target.value)}
    />
    <input
      type="number"
      placeholder="Enter Parking Spot"
      value={parkingSpot}
      onChange={(e) => setParkingSpot(e.target.value)}
    />
  </div>
);

export default CarForm;
