import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, message, Input, Row, Col, List, Card, Icon } from 'antd';
// import FlightDetails from "../flights/FlightsPage";
export default class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wheelChair: false,
      infantFacility: false,
      meals: '',
      shopping_items: '',
      items: [],
      text: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getItemList() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/flightList/`, {
        params: {
          id: this.props.id,
        },
      })
      .then(res => res.data.map(item => this.setState({ items: item.items })));
  }

  componentDidMount() {

    this.getItemList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.getItemList();
    }
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
    const details = {
      meals: this.state.meals,
      shopping_items: this.state.shopping_items,
      wheelChair: this.state.wheelChair,
      infantFacility: this.state.infantFacility,
    };
    event.preventDefault();
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/flightList/`,
        {
          params: {
            id: this.props.id,
          },
        },
        details
      )
      .then(res => console.log(res));
    message.success('Successfully Services Updated');
  }

  handleAncillaryChange = e => {
    this.setState({ text: e.target.value });
  };

  handleAncillarySubmit = e => {

    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    // const newItem = {
    //   text: this.state.text,
    //   id: Date.now(),
    // };

    let updatedItem = this.state.items.slice();
    updatedItem.push(this.state.text);

    // let newItem = this.state.text;
    // this.setState(state => ({
    //   items: state.items.concat(this.state.text),
    //   text: '',
    // }));
    this.setState({ items: updatedItem, text: '', disabled: false });
  };

  onRemove = index => {
    let id = this.props.id;

    let updatedItem = this.state.items.filter((item, i) => i !== index);

    this.setState({ items: updatedItem });
    axios
      .patch(`${process.env.REACT_APP_API_URL}/flightList/${id}`, {
        items: updatedItem,
      })
      .then(res => console.log(res));
  };

  onSave = () => {
    let updatedItem = this.state.items.slice();
    let id = this.props.id;
    axios
      .patch(`${process.env.REACT_APP_API_URL}/flightList/${id}`, {
        items: updatedItem,
      })
      .then(res => console.log(res));
  };

  render() {
    return (
      <>
        <Row>
          <Col span={12}>
            <Form
              onSubmit={this.handleSubmit}
              className="Add-Passenger-form"
              style={{ maxWidth: '300px' }}
            >
              <h3 style={{ color: 'Red' }}>Choose Services</h3>
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
          </Col>
          <Col span={12}>
            <h3 style={{ color: 'Red' }}>Add Ancillary Services</h3>
            <Form onSubmit={this.handleAncillarySubmit}>
              <Form.Item>
                <Input
                  id="new-todo"
                  onChange={this.handleAncillaryChange}
                  value={this.state.text}
                />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Add</Button>
              </Form.Item>
            </Form>
            <Card>
              <List
                itemLayout="horizontal"
                dataSource={this.state.items}
                renderItem={(item, index) => (
                  <Button
                    onClick={() => this.onRemove(index)}
                    style={{ marginLeft: '10px' }}
                  >
                    {item}
                    <Icon type="close-square" />
                  </Button>
                )}
              />
            </Card>
            <Button
              disabled={this.state.disabled}
              style={{ marginTop: '10px' }}
              onClick={this.onSave}
            >
              Save
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}
