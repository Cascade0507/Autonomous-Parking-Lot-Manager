// Car.jsx
import React from 'react';

const Car = ({ car }) => (
  <div
    className={`car ${car.status}`}
    style={{ backgroundImage: `url(${car.image})` }}
  ></div>
);

export default Car;
