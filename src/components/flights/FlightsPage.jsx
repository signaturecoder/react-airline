import { Button } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';
import AddServices from '../admin/AddServices';
import ViewPassengerTable from '../admin/ViewPassenger';
export default class FlightDetails extends Component {
  state = {
    flights: [],
    visible: false,
    flightId: '',
    id: '',
    buttonClicked:''
  };

  componentDidMount() {
    // after all the elements of the page is rendered correctly, this method is called
    axios.get(`${process.env.REACT_APP_API_URL}/flightList`).then(res => {
      const flights = res.data;
      this.setState({ flights });
    });
  }

  managePassenger = (flightId,e) => {
    this.setState({
      buttonClicked : e.target.name
    });
    this.setState({ flightId: flightId });
  };

  updateFlightDetail = (id,e)=>{
    this.setState({ id: id });
    this.setState({buttonClicked : e.target.name})

  }

  renderPassengerTable() {
    let flightId = this.state.flightId;
    return (
      <div>
         <ViewPassengerTable flightId={flightId} />
      </div>
    );
  }

  renderFlightTable() {
    return this.state.flights.map((flight, index) => {
      const {
        id,
        flightId,
        flightName,
        meals,
        wheelChair,
        shopping_items,
        infantFacility,
      } = flight; // destructring
      return (
        <tr key={index}>
          <td>{flightId}</td>
          <td>{flightName}</td>
          <td>{meals}</td>
          <td>{shopping_items}</td>
          <td>{wheelChair ? 'Yes' : 'No'}</td>
          <td>{infantFacility ? 'Yes' : 'No'}</td>
          <td>
            <Button name = 'manage' onClick={(e) => this.managePassenger(flightId, e)}>
              Manage
            </Button>
          </td>
          <td>
            <Button name="update" onClick = {(e) =>this.updateFlightDetail(id, e)}>
              Services
            </Button>
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
              <th>Special Meals</th>
              <th>Shopping Items</th>
              <th>wheelChair</th>
              <th>InfantFacility</th>
              <th>Manage Passengers</th>
              <th>Manage Services</th>
            </tr>
            {this.renderFlightTable()}
          </tbody>
        </table>
        {this.state.buttonClicked === '' ? <></> : this.state.buttonClicked === 'manage' ? this.renderPassengerTable() : <AddServices id={this.state.id}/> }
      </div>
    );
  }
}
