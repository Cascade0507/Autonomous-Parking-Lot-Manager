// import React from 'react';
// import './ParkingSpace.css';

// const ParkingSpace = ({ parkedCars }) => {
//   const numSpotsPerLot = 10; // Number of parking spots per lot
  
//   return (
//     <div className="parking-container">
//       {/* First Parking Lot */}
//       <div className="parking-grid">
//         {Array.from({ length: numSpotsPerLot }).map((_, index) => (
//           <div key={index} className="parking-spot">
//             {parkedCars[index] && (
//               <div
//                 className="car parked-car"
//                 style={{ backgroundImage: `url(${parkedCars[index].image})`, position: 'absolute' }}
//               ></div>
//             )}
//           </div>
//         ))}
//       </div>
//       <br></br><br></br><br></br>
//       {/* Second Parking Lot */}
//       <div className="parking-grid">
//         {Array.from({ length: numSpotsPerLot }).map((_, index) => (
//           <div key={index + numSpotsPerLot} className="parking-spot">
//             {parkedCars[index + numSpotsPerLot] && (
//               <div
//                 className="car parked-car"
//                 style={{ backgroundImage: `url(${parkedCars[index + numSpotsPerLot].image})`, position: 'absolute' }}
//               ></div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ParkingSpace;

import React from 'react';
import './ParkingSpace.css';

const ParkingSpace = ({ parkedCars = [] }) => {
  const spotsPerLot = 10;

  // Filter cars for each lot based on the parking spot number
  const lot1Cars = parkedCars.filter(car => car.parkingSpot <= spotsPerLot);
  const lot2Cars = parkedCars.filter(car => car.parkingSpot > spotsPerLot);

  return (
    <div className="parking-lots-container">
      <div className="parking-lot">
        <h3>Parking Lot 1</h3>
        <div className="parking-grid">
          {Array.from({ length: spotsPerLot }).map((_, index) => (
            <div key={index} className="parking-spot">
              {lot1Cars.find((car) => car.parkingSpot === index + 1) && (
                <div
                  className="car parked-car"
                  style={{ backgroundImage: `url(${lot1Cars.find((car) => car.parkingSpot === index + 1).image})` }}
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
            <div key={index} className="parking-spot">
              {lot2Cars.find((car) => car.parkingSpot === index + 1 + spotsPerLot) && (
                <div
                  className="car parked-car"
                  style={{ backgroundImage: `url(${lot2Cars.find((car) => car.parkingSpot === index + 1 + spotsPerLot).image})` }}
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

