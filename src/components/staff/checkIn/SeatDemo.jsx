import { Col, Row } from 'antd';
// import '../../css/Seat.css';
import axios from 'axios';
import React, { Component } from 'react';
import Seat from './Seat';

export class SeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = { seats: Array(50).fill(null) };
  }

  componentDidMount() {
    // after all the elements of the page is rendered correctly, this method is called
    // getting all passengers by filght id
    this.flightMealInformation();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.flightId !== this.props.flightId) {
      this.flightMealInformation();
    }
  }

  flightMealInformation = () => {
    let seats = this.state.seats.slice();

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/passengerList/?flightId=${this.props.flightId}`
      )
      .then(res => {
        const currentPaxList = res.data;

        // getting all passengers having seat
        let passengersWithSeat = currentPaxList
          .filter(passenger => passenger.seat_no !== '')
          .map(passenger => {
            return {
              paxId: passenger.id,
              seatNo: this.getSeatNoFromSeatLocation(passenger.seat_no),
              meals: passenger.meals,
            };
          });
  
        passengersWithSeat.map(item => {
          const { seatNo, meals } = item;
          if (meals !== '') {
            seats[seatNo] = 'MEAL';
          } else {
            seats[seatNo] = 'NO MEAL';
          }
          return seats;
        });
        this.setState({ seats: seats });
      });
  };

  getSeatNoFromSeatLocation = seatLocation => {
    let col = String(seatLocation).charAt(0);
    let row = String(seatLocation).substring(1);
    switch (col) {
      case 'A':
        col = 0;
        break;
      case 'B':
        col = 1;
        break;
      case 'C':
        col = 2;
        break;
      case 'D':
        col = 3;
        break;
      case 'E':
        col = 4;
        break;
      default:
    }
    return (row - 1) * 5 + col;
  };

  render() {
    let seats = this.state.seats;

    var seatMap = [];
    let row = 1;
    for (let seatIndex = 0; seatIndex < 50; seatIndex += 5) {
      seatMap.push(
        <tr key={row}>
          <td style={{ fontWeight: 'bold' }}>{row++}</td>
          <td>
            <Seat value={seatIndex} occupied={seats[seatIndex]} />
          </td>
          <td>
            <Seat value={seatIndex + 1} occupied={seats[seatIndex + 1]} />
          </td>
          <td>
            <div style={{ width: '8px' }}></div>
          </td>
          <td>
            <Seat value={seatIndex + 2} occupied={seats[seatIndex + 2]} />
          </td>

          <td>
            <Seat value={seatIndex + 3} occupied={seats[seatIndex + 3]} />
          </td>
          <td>
            <Seat value={seatIndex + 4} occupied={seats[seatIndex + 4]} />
          </td>
        </tr>
      );
    }
    return (
      <div>
            <Row gutter={16}>
              <Col style={{ borderStyle: 'solid', padding: '23px' }} xs={24} lg={12}>
                <table
                  style={{
                    height: '320px',
                    overflowY: 'auto',
                    overflowX: 'auto',
                    display: 'block',
                  }}
                >
                  <thead>
                    <tr>
                      <th></th>
                      <th style={{ textAlign: 'center' }}>A</th>
                      <th style={{ textAlign: 'center' }}>B</th>
                      <th style={{ textAlign: 'center' }}> </th>
                      <th style={{ textAlign: 'center' }}>C</th>
                      <th style={{ textAlign: 'center' }}>D</th>
                      <th style={{ textAlign: 'center' }}>E</th>
                    </tr>
                  </thead>
                  <tbody>{seatMap}</tbody>
                </table>
              </Col>

              <Col xs={24} lg={12}>
                <div className="seat-indicator">
                  <Seat occupied="MEAL" />
                  <b>MEAL</b>
                  <Seat occupied="NO MEAL" />
                  <b>NO SPEACIAL MEAL</b>
                </div>
              </Col>
            </Row>
      </div>
    );
  }
}

export default SeatMap;
