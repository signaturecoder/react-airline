import React, { Component } from 'react';
import FlightList from '../checkIn/FlightList';

export default class InFlight extends Component {
  render() {
    return (
      <div>
        <FlightList updateServices={true} />
      </div>
    );
  }
}
