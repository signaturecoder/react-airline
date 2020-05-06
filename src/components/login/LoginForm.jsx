import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, message } from 'antd';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      islogged: false,
    };
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

  authenticateUser = async userLogged => {
    return await axios
      .get(`${process.env.REACT_APP_API_URL}/users`, {
        params: {
          uname: userLogged.userName,
          password: userLogged.password,
        },
      })
      .then(res => res);
  };

  handleSubmit = e => {
    e.preventDefault();
    const userLogged = {
      userName: this.state.userName,
      password: this.state.password,
    };

    let promises = this.authenticateUser(userLogged);
    promises.then(res => {
      if (res.data.length === 1) {
        localStorage.setItem('role', res.data[0].role);
        this.setState({ islogged: true });
      } else {
        message.error('Credentials Mis-match');
      }
    });
  };

  responseGoogle = response => {
    localStorage.setItem('role', 'staff');
    this.setState({ islogged: true });
  };

  render() {
    const userRole = localStorage.getItem('role');

    if (userRole === 'admin') {
      return <Redirect to="/admin" />;
    }
    if (userRole === 'staff') {
      return <Redirect to="/staff" />;
    }

    return (
      <>
        <Form className="login-form">
          <h1>Login Form</h1>
          <Form.Item>
            <label>
              Enter Username
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                name="userName"
                placeholder="Username"
                value={this.state.userName}
                onChange={this.handleInputChange}
              />
            </label>
          </Form.Item>
          <Form.Item>
            <label>
              Enter Password
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </label>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={this.handleSubmit}
            >
              Log in
            </Button>
          </Form.Item>
          <Form.Item>
            <GoogleLogin
              clientId="399945929502-qfr5o9c0svdjvut34arluqa47jt8js54.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
              buttonText="GOOGLE"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              className="login-form-button"
            />
          </Form.Item>
        </Form>
      </>
    );
  }
}
export default LoginForm;
