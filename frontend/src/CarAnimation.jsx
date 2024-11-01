import React, { useState, useEffect } from 'react';
import './CarAnimation.css';
import CarForm from './CarForm';
import CarControls from './CarControls';
import Road from './Road';
import ParkingSpace from './ParkingSpace';

const CarAnimation = () => {
  const [cars, setCars] = useState([]);
  const [carIndex, setCarIndex] = useState(0);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [parkingSpot, setParkingSpot] = useState('');

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

  const driveCar = () => {
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
      setTimeout(() => {
        setCars((prevCars) =>
          prevCars.map((car) =>
            car.id === lastCar.id ? { ...car, status: 'parked' } : car
          )
        );
      }, 2000);
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
