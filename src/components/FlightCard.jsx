import React from 'react';
import { Card, Button } from 'react-bootstrap';

const FlightCard = ({ routeData }) => {
    console.log(routeData)
  const { price, departure, arrival, airlines } = routeData;

  const formattedDeparture = new Date(departure).toLocaleString();
  const formattedArrival = new Date(arrival).toLocaleString();

  return (
    <Card className="h-100">
        <Card.Body className="d-flex flex-column">
            <Card.Title>Flight Information</Card.Title>
            <div className="flex-grow-1">
            <p className="mb-1">
                <strong>Price: </strong>{price}
            </p>
            <p className="mb-1">
                <strong>Departure: </strong>{formattedDeparture}
            </p>
            <p className="mb-1">
                <strong>Arrival: </strong>{formattedArrival}
            </p>
            <p className="mb-1">
                <strong>Airlines: </strong>{airlines.join(', ')}
            </p>
            </div>
            <Button variant="primary" className="mt-auto">Book Now</Button>
        </Card.Body>
    </Card>
  );
};

const FlightCardContainer=({flightData})=>{
    return (
        <div className="container">
  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
    {flightData.details.map((routeData, index) => (
      <div className="col" key={index}>
        <Card className="h-100">
          <Card.Body className="d-flex flex-column">
            <Card.Title>Flight Information</Card.Title>
            <div className="flex-grow-1">
              <p className="mb-1">
                <strong>Price: </strong>{routeData.price}
              </p>
              <p className="mb-1">
                <strong>Departure: </strong>{routeData.formattedDeparture}
              </p>
              <p className="mb-1">
                <strong>Arrival: </strong>{routeData.formattedArrival}
              </p>
              <p className="mb-1">
                <strong>Airlines: </strong>{routeData.airlines.join(', ')}
              </p>
            </div>
            <Button variant="primary" className="mt-auto">Book Now</Button>
          </Card.Body>
        </Card>
      </div>
    ))}
  </div>
</div>

    )
}

export default FlightCardContainer;
