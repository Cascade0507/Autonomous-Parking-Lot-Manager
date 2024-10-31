import React from 'react';

const CarControls = ({ allowNextCar, driveCar, isAllowDisabled }) => (
  <div>
    <div className="button-container-allow">
      <button onClick={allowNextCar} disabled={isAllowDisabled}>Accept Next Car</button>
    </div>
    <div className="button-container">
      <button onClick={driveCar}>Allow the Car</button>
    </div>
  </div>
);

export default CarControls;
