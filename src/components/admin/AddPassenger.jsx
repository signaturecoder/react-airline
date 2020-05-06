import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';
export default class AddPassenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightId: '',
      pName: '',
      passport: {
        passportNum: '',
        expiry_date: '',
      },
      address: '',
      dob: '',
      issubmitted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    if (name === 'passportNum' || name === 'expiry_date') {
      this.setState({
        passport: {
          ...this.state.passport,
          [name]: value,
        },
      });
    } else {
      this.setState({
        ...this.state,
        [name]: value,
      });
    }
    // you can get all state using spread operator like {...state, [event.target.name]}
  };

  handleSubmit = event => {
    const passenger = {
      flightId: this.state.flightId,
      pName: this.state.pName,
      passport: {
        passportNum: this.state.passport.passportNum,
        expiry_date: this.state.passport.expiry_date,
      },
      dob: this.state.dob,
      address: this.state.address,
    };
    event.preventDefault();
    
    axios
      .post(`${process.env.REACT_APP_API_URL}/passengerList`, passenger)
      .then(res => {
        this.setState({issubmitted: true});
        this.props.addNewPassenger(passenger);
      });
    message.success('Successfully Passenger Added');
  
    
  };
  render() {
    return (
      <>
        <Form
          onSubmit={this.handleSubmit}
          className="Add-Passenger-form"
          style={{ maxWidth: '300px' }}
        >
          <h3 style={{ color: 'Red' }}>Add Passenger Form</h3>
          <Form.Item>
            <Input
              type="text"
              name="flightId"
              placeholder="Enter flight Id"
              value={this.state.flightId}
              onChange={this.handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="text"
              name="pName"
              placeholder="Enter Name"
              value={this.state.pName}
              onChange={this.handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="text"
              name="passportNum"
              placeholder="Enter Passport Number"
              value={this.state.passport.passportNum}
              onChange={this.handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="text"
              name="expiry_date"
              placeholder="Enter Expiry Date "
              value={this.state.passport.expiry_date}
              onChange={this.handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="text"
              name="dob"
              placeholder="Enter Date Of Birth "
              value={this.state.dob}
              onChange={this.handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="text"
              name="address"
              placeholder="Enter Address "
              value={this.state.address}
              onChange={this.handleInputChange}
            />
            <Button
              type="primary"
              htmlType="submit"
              className="feedback-form-button"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}
