import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { ClearPaxSeatMap } from '../../../redux/actions/PassengerActions';
class FlightList extends Component {
  state = {
    flights: [],
  };

  componentDidMount() {
    // after all the elements of the page is rendered correctly, this method is called
    axios.get(`${process.env.REACT_APP_API_URL}/flightList`).then(res => {
      const flights = res.data;
      this.setState({ flights });
    });
    
  }

  handlePassenger = () => {
    this.props.clearPaxSeatMap();
  };

  renderFlightTable() {
    const services = this.props.updateServices;
    return this.state.flights.map((flight, index) => {
      const {
        flightId,
        flightName,
        flight_from,
        flight_to,
        start_time,
        end_time,
      } = flight; // destructring
      return (
        <tr key={index}>
          <td>{flightId}</td>
          <td>{flightName}</td>
          <td>{flight_from}</td>
          <td>{flight_to}</td>
          <td>{start_time}</td>
          <td>{end_time}</td>
          <td>
            {services ? (

              // inFlight
              <Button>
                <Link
                  to={`/staff/inFlight/managePassengers/${flightId}/${services}`}
                >
                  Manage
                </Link>
              </Button>
              
            ) : (

               // checkIn
              <Button onClick={this.handlePassenger}>
                <Link to={'/staff/checkIn/managePassengers/' + flightId}>
                  Manage
                </Link>
              </Button>
            )}
          </td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div>
        <h1>Flight List</h1>
        <table className="passenger-table">
          <tbody>
            <tr>
              <th>Flight Number</th>
              <th>Flight Name</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Arrival</th>
              <th>Departure</th>
              <th>Passengers</th>
              {/* <th>Seat Allocation </th> */}
            </tr>
            {this.renderFlightTable()}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    passengerSeatMap: state.paxSeatMap.passengerSeatMap,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearPaxSeatMap: () => dispatch(ClearPaxSeatMap()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightList);
