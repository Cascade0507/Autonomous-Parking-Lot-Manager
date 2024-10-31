// Road.jsx
import React from 'react';
import Car from './Car';

const Road = ({ cars }) => (
  <div className="road">
    {cars.filter((car) => car.status !== 'parked').map((car) => (
      <Car key={car.id} car={car} />
    ))}
  </div>
);

export default Road;
