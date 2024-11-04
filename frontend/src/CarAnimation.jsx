// CarAnimation.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarAnimation.css';
import CarForm from './CarForm';
import CarControls from './CarControls';
import Road from './Road';
import ParkingSpace from './ParkingSpace';
import AvailableSpotsTable from './AvailableSpots';

const CarAnimation = () => {
  const [cars, setCars] = useState([]);
  const [carIndex, setCarIndex] = useState(0);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [parkingSpot, setParkingSpot] = useState('');
  const [parkingLot, setParkingLot] = useState('');
  const [availableSpots, setAvailableSpots] = useState([]); // To store available spots

  const carImages = ['car.png', 'car2.png', 'car3.png'];

  const allowNextCar = () => {
    if (vehicleNumber && parkingSpot) {
      const randomCarImage = carImages[Math.floor(Math.random() * carImages.length)];
      setCars([...cars, { id: carIndex, status: 'drive-in', image: randomCarImage, vehicleNumber, parkingSpot: parseInt(parkingSpot) }]);
      setCarIndex(carIndex + 1);
      setVehicleNumber('');
      setParkingSpot('');
    } else {
      alert("Please enter both vehicle number and parking spot.");
    }
  };

  const driveCar = async () => {
    if (carIndex > 0 && carIndex <= cars.length) {
      try {                                        // reservation request to the server
        await axios.post(`http://localhost:8080/reserve/${vehicleNumber}/${parkingSpot}`);
        
        setCars((prevCars) =>
          prevCars.map((car, idx) =>         //car drive-out animation
            idx === carIndex - 1 ? { ...car, status: 'drive-out' } : car
          )
        );

        setAvailableSpots([]);                // Clear the available spots table

      } catch (error) {
        console.error("Error creating reservation:", error);
        alert("Failed to reserve parking spot.");
      }
    }
  };

  const checkAvailability = async () => {
    try {
      if (parkingLot) {
        const response = await axios.get(`http://localhost:8080/available_spots/${parkingLot}`);
        setAvailableSpots(response.data); // Set the available spots from the response
      } else {
        alert("Please enter a parking lot ID.");
      }
    } catch (error) {
      console.error("Error fetching available spots:", error);
    }
  };

  useEffect(() => {
    // Update car to "parked" status after drive-out is complete
    const timer = setTimeout(() => {
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.status === 'drive-out' ? { ...car, status: 'parked' } : car
        )
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, [cars]);

  return (
    <div className="container">
      <div>
      <CarForm
        vehicleNumber={vehicleNumber}
        setVehicleNumber={setVehicleNumber}
        parkingSpot={parkingSpot}
        setParkingSpot={setParkingSpot}
        parkingLot={parkingLot}
        setParkingLot={setParkingLot}
        checkAvailability={checkAvailability} // Pass the checkAvailability function
        
      />
      <AvailableSpotsTable availableSpots={availableSpots} parkingLot={parkingLot} />
      </div>
      <CarControls
        allowNextCar={allowNextCar}
        driveCar={driveCar}
        isAllowDisabled={!vehicleNumber || !parkingSpot}
      />
      <Road cars={cars} />
      <ParkingSpace parkedCars={cars.filter((car) => car.status === 'parked')} />
      
      {/* Use the AvailableSpotsTable component to display the spots */}
      
    </div>
  );
};

export default CarAnimation;
