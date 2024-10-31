import React from 'react';
import './ParkingSpace.css';

const ParkingSpace = ({ parkedCars }) => {
  return (
    <div className="parking-grid">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="parking-spot">
          {parkedCars[index] && (
            <div
              className="car parked-car"
              style={{ backgroundImage: `url(${parkedCars[index].image})`, position: 'absolute' }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ParkingSpace;
