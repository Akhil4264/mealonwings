import React from 'react';

const FlightRegs = () => {
  const drones = [
    {
      name: "Drone Model A",
      image: "/drone1.webp",
      specs: "Speed: 60 mph, Range: 30 miles",
      description: "High-speed aerial drone perfect for racing and quick deliveries."
    },
    {
      name: "Drone Model B",
      image: "/drone2.webp",
      specs: "Speed: 45 mph, Range: 50 miles",
      description: "A durable drone designed for long-distance travel and heavy payloads."
    },
    {
      name: "Drone Model C",
      image: "/drone3.webp",
      specs: "Speed: 25 mph, Range: 15 miles",
      description: "Compact and energy-efficient, ideal for surveillance and filming."
    }
  ];

  return (
    <div className='container mt-4'>
      <div className="row">
        {drones.map((drone, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card">
              <img src={drone.image} className="card-img-top" alt={drone.name} />
              <div className="card-body">
                <h5 className="card-title">{drone.name}</h5>
                <p className="card-text">{drone.specs}</p>
                <p className="card-text">{drone.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlightRegs;
