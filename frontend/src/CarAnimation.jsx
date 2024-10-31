// CarAnimation.jsx
import React, { useState, useEffect } from 'react';
import './CarAnimation.css';
import CarForm from './CarForm';
import CarControls from './CarControls';
import Road from './Road';
import ParkingSpace from './ParkingSpace';

const CarAnimation = () => {
  const [cars, setCars] = useState([]); // Track all cars (both moving and parked)
  const [carIndex, setCarIndex] = useState(0); // Track the current car to drive out
  const [vehicleNumber, setVehicleNumber] = useState(''); // Track vehicle number input
  const [parkingSpot, setParkingSpot] = useState(''); // Track parking spot input

  const carImages = ['car.png', 'car2.png', 'car3.png']; // Array of car images

  const allowNextCar = () => {
    // Ensure inputs are filled
    if (vehicleNumber && parkingSpot) {
      const randomCarImage = carImages[Math.floor(Math.random() * carImages.length)];
      setCars([...cars, { id: carIndex, status: 'drive-in', image: randomCarImage, vehicleNumber, parkingSpot }]);
      setCarIndex(carIndex + 1); // Increment the index for the next car
      setVehicleNumber(''); // Clear inputs
      setParkingSpot('');
    } else {
      alert("Please enter both vehicle number and parking spot.");
    }
  };

  const driveCar = () => {
    // If there are cars waiting to be driven out
    if (carIndex > 0 && carIndex <= cars.length) {
      setCars((prevCars) =>
        prevCars.map((car, idx) =>
          idx === carIndex - 1 ? { ...car, status: 'drive-out' } : car
        )
      );
    }
  };

  useEffect(() => {
    const lastCar = cars.find((car) => car.status === 'drive-out');
    if (lastCar) {
      // Move the car to parking after it finishes the transition
      setTimeout(() => {
        setCars((prevCars) =>
          prevCars.map((car) =>
            car.id === lastCar.id ? { ...car, status: 'parked' } : car
          )
        );
      }, 2000); // Timing matches the CSS transition duration
    }
  }, [cars]);

  return (
    <div className="container">
      <CarForm
        vehicleNumber={vehicleNumber}
        setVehicleNumber={setVehicleNumber}
        parkingSpot={parkingSpot}
        setParkingSpot={setParkingSpot}
      />
      <CarControls
        allowNextCar={allowNextCar}
        driveCar={driveCar}
        isAllowDisabled={!vehicleNumber || !parkingSpot}
      />
      <Road cars={cars} />
      <ParkingSpace parkedCars={cars.filter((car) => car.status === 'parked')} />
    </div>
  );
};

export default CarAnimation;
