import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Row, Col } from 'antd';

import {
  AddToPaxSeatMap,
  RemoveFromPaxSeatMap,
} from '../../../redux/actions/PassengerActions';
import Seat from './Seat';
class SeatMatrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      particularPassenger: {},
      seat_no: '',
      isChecked: false,
    };
  }

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/passengerList/${this.props.match.params.pid}`
      )
      .then(res => {
        this.setState({ particularPassenger: res.data });
      });
  }

  calculateSeat(seatNo) {
    let seatLabelArray = ['A', 'B', 'C', 'D', 'E'];
    let col = seatNo % 5; // a, b, c, d, e
    let row = seatNo / 5; // +1
    return seatLabelArray[col] + Math.floor(1 + row);
  }

  // seat booked and remove
  handleSeat = seatNo => {
    let finalSeat = '';
    const paxId = this.props.match.params.pid;

    const paxDetails = this.state.particularPassenger;

    if (
      this.props.passengerSeatMap.some(
        matchingPax => matchingPax.seatNo === seatNo
      )
    ) {
      this.props.removeFromPaxSeatMap(Number(paxId));
    } else {
      this.props.addToPaxSeatMap(
        Number(paxId),
        seatNo,
        paxDetails.wheelChair,
        paxDetails.infantFacility
      ); // dispatch an actions
      finalSeat = this.calculateSeat(seatNo);
    }
    axios
      .patch(`${process.env.REACT_APP_API_URL}/passengerList/${paxId}`, {
        seat_no: finalSeat,
        isChecked: finalSeat !== '' ? true : false,
      })
      .then(res => console.log(res));
    let selectedPssenger = this.state.particularPassenger;
    if (finalSeat === '') {
      selectedPssenger.seat_no = '';
      selectedPssenger.isChecked = false;
    } else {
      selectedPssenger.seat_no = this.calculateSeat(seatNo);
      selectedPssenger.isChecked = true;
    }
    this.setState({ particularPassenger: selectedPssenger });
  };

  displaySeatMatrix = () => {
    const paxId = this.props.match.params.pid;

    let paxSeatMap = this.props.passengerSeatMap;
    let seatArray = Array(50).fill(null);
    for (let i = 0; i < paxSeatMap.length; i++) {
      if (paxId !== paxSeatMap[i].paxId) {
        seatArray[paxSeatMap[i].seatNo] = 'BLOCKED';

        if (paxSeatMap[i].wheelChair && !paxSeatMap[i].infantFacility) {
          seatArray[paxSeatMap[i].seatNo] = 'BLOCKED WITH WHEELCHAIR';
        } else if (paxSeatMap[i].infantFacility && !paxSeatMap[i].wheelChair) {
          seatArray[paxSeatMap[i].seatNo] = 'BLOCKED WITH INFANT';
        } else if (paxSeatMap[i].wheelChair && paxSeatMap[i].infantFacility)
          seatArray[paxSeatMap[i].seatNo] = 'BLOCKED WITH BOTH';
      }

      if (paxId === String(paxSeatMap[i].paxId)) {
        seatArray[paxSeatMap[i].seatNo] = 'MODIFY';
      }
    }
    let row = 0;
    let seatMap = [];
    for (let i = 0; i < 50; i += 5) {
      row++;
      seatMap.push(
        <tr key={i}>
          <td>{row}</td>
          <td>
            <Seat
              value={i}
              occupied={seatArray[i]}
              onClickSeat={() => this.handleSeat(i)}
            />
          </td>
          <td>
            <Seat
              value={i + 1}
              occupied={seatArray[i + 1]}
              onClickSeat={() => this.handleSeat(i + 1)}
            />
          </td>
          <td></td>
          <td>
            <Seat
              value={i + 2}
              occupied={seatArray[i + 2]}
              onClickSeat={() => this.handleSeat(i + 2)}
            />
          </td>
          <td>
            <Seat
              value={i + 3}
              occupied={seatArray[i + 3]}
              onClickSeat={() => this.handleSeat(i + 3)}
            />
          </td>
          <td>
            <Seat
              value={i + 4}
              occupied={seatArray[i + 4]}
              onClickSeat={() => this.handleSeat(i + 4)}
            />
          </td>
        </tr>
      );
    }
    return seatMap;
  };

  renderParticularPassengerDetail() {
    const paxDetails = this.state.particularPassenger;
    const {
      id,
      flightId,
      pName,
      isChecked,
      seat_no,
      wheelChair,
      infantFacility,
    } = paxDetails; // destructring
    return (
      <tr key={id}>
        <td>{flightId}</td>
        <td>{pName}</td>
        <td>{isChecked ? 'Yes' : 'No'}</td>
        <td>{seat_no}</td>
        <td>{wheelChair ? 'Yes' : 'No'}</td>
        <td>{infantFacility ? 'Yes' : 'No'}</td>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <table className="passenger-table">
          <tbody>
            <tr>
              <th>Flight Number</th>
              <th>Passenger Name</th>
              <th>Checking Status</th>
              <th>Seat Number</th>
              <th>wheelChair</th>
              <th>InfantFacility</th>
            </tr>
            {this.renderParticularPassengerDetail()}
          </tbody>
        </table>
        <Row>
          <Col xs={24} lg={12}>
            <table className="seat-matrix">
              <tbody>
                <tr>
                  <th></th>
                  <th className="seat-header">A</th>
                  <th className="seat-header">B</th>
                  <th className="seat-header" style={{ padding: '10px' }}></th>
                  <th className="seat-header">C</th>
                  <th className="seat-header">D</th>
                  <th className="seat-header">E</th>
                </tr>

                {this.displaySeatMatrix()}
              </tbody>
            </table>
          </Col>
          <Col xs={24} lg={12}>
            <div className="seat-indicator">
              <Seat occupied="MODIFY" />
              <b>Current Seat</b>
              <Seat occupied="BLOCKED" />
              <b>Booked</b>
              <Seat occupied="BLOCKED WITH WHEELCHAIR" />
              <b> Passenger Required W/C</b>
              <Seat occupied="BLOCKED WITH INFANT" />
              <b> Passenger with INF</b>
              <Seat occupied="BLOCKED WITH BOTH" />
              <b>Passenger with INF and Requiring W/C</b>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    passengerSeatMap: state.paxSeatMap.passengerSeatMap,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addToPaxSeatMap: (paxId, seatNo, wheelChair, infantFacility) =>
      dispatch(AddToPaxSeatMap(paxId, seatNo, wheelChair, infantFacility)),
    removeFromPaxSeatMap: paxId => dispatch(RemoveFromPaxSeatMap(paxId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeatMatrix);
