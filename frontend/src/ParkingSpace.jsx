// ParkingSpace.jsx
import React from 'react';
import './ParkingSpace.css';

const ParkingSpace = ({ parkedCars = [] }) => {
  const spotsPerLot = 10;
   // console.log(parkedCars);
  // Function to get the parking lot and index from the spot ID
  const getSpotIndex = (spotId) => {
    console.log("spotId type:", typeof spotId, "value:", spotId);
    const lotNumber = parseInt(spotId.charAt(4)); // Get the X in SPOTXY
    const spotNumber = parseInt(spotId.slice(5)); // Get everything after the 6th character
    return { lotNumber, spotNumber };
  };

  return (
    <div className="parking-lots-container">
      <div className="parking-lot">
        <h3>Parking Lot 1</h3>
        <div className="parking-grid">
          {Array.from({ length: spotsPerLot }).map((_, index) => (
            <div key={index} className="parking-spot">
              {parkedCars.some((car) => getSpotIndex(car.parkingSpot).lotNumber === 0 && getSpotIndex(car.parkingSpot).spotNumber === index + 1) && (
                <div
                  className="car parked-car"
                  style={{
                    backgroundImage: `url(${
                      parkedCars.find(car => getSpotIndex(car.parkingSpot).lotNumber === 0 && getSpotIndex(car.parkingSpot).spotNumber === index + 1).image
                    })`
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="parking-lot">
        <h3>Parking Lot 2</h3>
        <div className="parking-grid">
          {Array.from({ length: spotsPerLot }).map((_, index) => (
            <div key={index + spotsPerLot} className="parking-spot">
              {parkedCars.some((car) => getSpotIndex(car.parkingSpot).lotNumber === 1 && getSpotIndex(car.parkingSpot).spotNumber === index + 1) && (
                <div
                  className="car parked-car"
                  style={{
                    backgroundImage: `url(${
                      parkedCars.find(car => getSpotIndex(car.parkingSpot).lotNumber === 1 && getSpotIndex(car.parkingSpot).spotNumber === index + 1).image
                    })`
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParkingSpace;

//vklnsdvadsjkkhv