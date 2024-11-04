import React from 'react';
import './AvailableSpots.css';

const AvailableSpotsTable = ({ availableSpots, parkingLot }) => {
    console.log("Available spots received:", availableSpots);
  return (
    <div className="available-spots-table">
      <h3>Available Parking Spots in Lot {parkingLot}:</h3>
      <table>
        <thead>
          <tr>
            <th>Spot ID</th>
            <th>Spot Number</th>
          </tr>
        </thead>
        <tbody>
          {availableSpots.map((spot, index) => (
            <tr key={index}>
              <td>{spot.spot_id}</td>
              <td>{spot.spot_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableSpotsTable;
