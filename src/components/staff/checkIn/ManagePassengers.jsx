import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import SeatDemo from './SeatDemo';
import { AddToPaxSeatMap } from '../../../redux/actions/PassengerActions';
class ManagePassengers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPaxList: [],
      allPaxList: [],
      flightId: '',
      mealButtonClicked: false,
      isChecked: false,
      wheelChair: false,
      infantFacility: false,
    };
  }

  componentDidMount() {
    // after all the elements of the page is rendered correctly, this method is called
    // getting all passengers by filght id
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/passengerList/?flightId=${this.props.match.params.id}`
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
              wheelChair: passenger.wheelChair,
              infantFacility: passenger.infantFacility,
            };
          });
        passengersWithSeat.map(item => {
          const { paxId, seatNo, wheelChair, infantFacility } = item;
          this.props.addToPaxSeatMap(paxId, seatNo, wheelChair, infantFacility);
          return item;
        });
        this.setState({ currentPaxList, allPaxList: currentPaxList, flightId:this.props.match.params.id });
      });
  }

  componentDidUpdate(prevProps){
    if (prevProps.match.params.id !== this.props.match.params.id){
      this.setState({flightId:this.props.match.params.id});
    }
  }

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

  handleCheckbox = e => {
    let isChecked = this.state.isChecked;
    let wheelChair = this.state.wheelChair;
    let infantFacility = this.state.infantFacility;

    const value = e.target.checked;
    const name = e.target.name;
    if (name === 'isChecked') {
      isChecked = !this.state.isChecked;
    } else if (name === 'wheelChair') {
      wheelChair = !this.state.wheelChair;
    } else if (name === 'infantFacility') {
      infantFacility = !this.state.infantFacility;
    }

    this.setState({ [name]: value });

    let filteredPaxList = this.state.allPaxList;

    if (isChecked) {
      filteredPaxList = filteredPaxList.filter(pax => pax.isChecked);
    }
    if (wheelChair) {
      filteredPaxList = filteredPaxList.filter(pax => pax.wheelChair);
    }
    if (infantFacility) {
      filteredPaxList = filteredPaxList.filter(pax => pax.infantFacility);
    }
    this.setState({ currentPaxList: filteredPaxList });
  };

  renderPassengerTable() {
    const service = this.props.match.params.services;
    return this.state.currentPaxList.map((passenger, index) => {
      const {
        id,
        flightId,
        pName,
        isChecked,
        seat_no,
        meals,
        wheelChair,
        shopping_items,
        infantFacility,
      } = passenger; // destructring
      return (
        <tr key={index}>
          <td>{flightId}</td>
          <td>{pName}</td>
          <td>{isChecked ? 'Yes' : 'No'}</td>
          <td>{seat_no}</td>
          <td>{meals}</td>
          <td>{shopping_items}</td>
          <td>{wheelChair ? 'Yes' : 'No'}</td>
          <td>{infantFacility ? 'Yes' : 'No'}</td>

          {service ? (
            <>
              <td>
                <Button>
                  <Link to={`/staff/inFlight/flightServices/${id}`}>
                    Add Services
                  </Link>
                </Button>
              </td>
            </>
          ) : (
            <td>
              {' '}
              <Button>
                <Link to={`/staff/checkIn/seatMatrix/${id}/${flightId}`}>
                  Check In
                </Link>
              </Button>
            </td>
          )}
        </tr>
      );
    });
  }

  render() {
    const changeLabel = this.props.match.params.services;
    return (
      <>
        <h1> Manage Passenger List </h1>

        <Checkbox
          name="isChecked"
          checked={this.state.isChecked}
          onChange={this.handleCheckbox}
        >
          Check-in
        </Checkbox>
        <Checkbox
          name="wheelChair"
          checked={this.state.wheelChair}
          onChange={this.handleCheckbox}
        >
          WheelChair
        </Checkbox>
        <Checkbox
          name="infantFacility"
          checked={this.state.infantFacility}
          onChange={this.handleCheckbox}
        >
          InfantFacility
        </Checkbox>
        <table className="passenger-table">
          <tbody>
            <tr>
              <th>Flight Number</th>
              <th>Passenger Name</th>
              <th>Checking Status</th>
              <th>Seat Number</th>
              <th>Special Meals</th>
              <th>Shopping Items</th>
              <th>wheelChair</th>
              <th>InfantFacility</th>
              {changeLabel ? (
                <>
                  <th>Update Services</th>
                </>
              ) : (
                <th>Check in</th>
              )}
            </tr>
            {this.renderPassengerTable()}
          </tbody>
        </table>
        {changeLabel ? <SeatDemo flightId={this.state.flightId} /> : <></>}
      </>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePassengers);
