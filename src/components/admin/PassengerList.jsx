import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';
const PassengerList = () => {
  const [passengers, setPassengers] = useState([]);
  const [flights, setFlights] = useState([]);
  const [isPassengerAvailable, setIsPassengerAvailable] = useState(false);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/flightList`).then(res => {
      const flight = res.data;
      setFlights(flight);
    });
  }, []);

  const fetchPassengerDetails = flightId => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/passengerList/?flightId=${flightId}`
      )
      .then(res => {
        const passenger = res.data;
        setPassengers(passenger);
      });
    setIsPassengerAvailable(true);
  };

  const renderFlightsTable = () => {
    return flights.map(flight => {
      const { id, flightId, flightName } = flight;
      return (
        <tr key={id}>
          <td>{flightId}</td>
          <td>{flightName}</td>
          <td>
            <Button onClick={() => fetchPassengerDetails(flightId)}>
              View
            </Button>
          </td>
        </tr>
      );
    });
  };

  const renderPassengersTable = () => {
    return passengers.map(passenger => {
      const {
        id,
        flightId,
        pName,
        seat_no,
        wheelChair,
        infantFacility,
      } = passenger; // destructring
      return (
        <tr key={id}>
          <td>{flightId}</td>
          <td>{pName}</td>
          <td>{seat_no}</td>
          <td>{wheelChair ? 'Yes' : 'No'}</td>
          <td>{infantFacility ? 'Yes' : 'No'}</td>
        </tr>
      );
    });
  };
  return (
    <div>
      <h1>Flight List</h1>
      <table className="flight-table">
        <tbody>
          <tr>
            <th>Flight Id</th>
            <th>Flight Name</th>
            <th>View Passengers</th>
          </tr>
          {renderFlightsTable()}
        </tbody>
      </table>
      {isPassengerAvailable ? (
        <>
          <h1>Passenger List</h1>
          <table className="passenger-table">
            <tbody>
              <tr>
                <th>Flight Id</th>
                <th>Passenger Name</th>
                <th>Seat Number</th>
                <th>Wheel Chair</th>
                <th>Infant Facility</th>
              </tr>
              {renderPassengersTable()}
            </tbody>
          </table>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default PassengerList;
