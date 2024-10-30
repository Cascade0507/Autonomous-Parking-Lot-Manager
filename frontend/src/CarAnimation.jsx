import React, { useState, useEffect } from 'react';
import './CarAnimation.css';

const CarAnimation = () => {
  const [cars, setCars] = useState([]);
  const [carCount, setCarCount] = useState(0);
  const [carAllowed, setCarAllowed] = useState(0);

  // Array of car images to choose from
  const carImages = [
    'car.png', // Add paths to your car images
    'car2.png',
    'car3.png',
  ];

  const AllowNext = () => {
    // Randomly select a car image
    const randomCarImage = carImages[Math.floor(Math.random() * carImages.length)];

    // Add a new car with a specific image
    setCars([...cars, { id: carCount, driveOut: false, image: randomCarImage }]);
    setCarCount(carCount + 1);
  };

  const driveCar = () => {
    if (carAllowed >= cars.length) return;

    // Update the car to drive out
    setCars(cars.map((car, index) => 
      index === carAllowed ? { ...car, driveOut: true } : car
    ));
    setCarAllowed(carAllowed + 1);
  };

  return (
    <div className="container">
      <div className="button-container">
        <button onClick={driveCar}>Allow the Car</button>
      </div>
      <div className="button-container-allow">
        <button onClick={AllowNext}>Accept Next Car</button>
      </div>

      <div className="road">
        {cars.map(car => (
          <div
            key={car.id}
            className={`car ${car.driveOut ? 'drive-out' : 'drive-in'}`}
            style={{ backgroundImage: `url(${car.image})` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CarAnimation;
