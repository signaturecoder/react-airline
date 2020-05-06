import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, message } from 'antd';

export default class FlightServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wheelChair: false,
      infantFacility: false,
      meals: '',
      shopping_items: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    // const value = event.target.value;
    const name = event.target.name;
    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  handleSubmit(event) {
    const {
      match: { params },
    } = this.props;
    
    const details = {
      meals: this.state.meals,
      shopping_items: this.state.shopping_items,
      wheelChair: this.state.wheelChair,
      infantFacility: this.state.infantFacility,
    };
    event.preventDefault();
    axios
      .patch(`${process.env.REACT_APP_API_URL}/passengerList/${params.id}`, details)
      .then(res => {
        console.log(res.data);
      });
    message.success('Successfully Services Updated');
    this.props.history.push('/staff/inFlight');
  }

  render() {
    
    return (
      <>
      <h1>InFlight Services</h1>
        <Form
          onSubmit={this.handleSubmit}
          className="Add-Passenger-form"
          style={{ maxWidth: '300px' }}
        >
          <h3 style={{ color: 'Red' }}>Add Ancillary Services</h3>
          <label>Choose Services</label>
          <Form.Item>
            wheel Chair
            <input
              name="wheelChair"
              type="checkbox"
              checked={this.state.wheelChair}
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            Infant Facility
            <input
              name="infantFacility"
              type="checkbox"
              checked={this.state.infantFacility}
              onChange={this.handleChange}
            />
          </Form.Item>
          <label>Choose Meals</label>
          <Form.Item>
            <select
              name="meals"
              value={this.state.meals}
              onChange={this.handleChange}
            >
              <option value="South Indian">South Indian</option>
              <option value="North Indian">North Indian</option>
              <option value="Chinese">Chinese</option>
            </select>
          </Form.Item>
          <label>Choose Shopping Items</label>
          <Form.Item>
            <select
              name="shopping_items"
              value={this.state.shopping_items}
              onChange={this.handleChange}
            >
              <option value="Bags">Bags</option>
              <option value="Shoes">Shoes</option>
            </select>
          </Form.Item>
          <Form.Item>
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
