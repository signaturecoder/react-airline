import React from 'react';
import { Layout, Menu, Button, Icon, Col, Row } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { Link, Redirect, useHistory } from 'react-router-dom';
import PassengerList from './PassengerList';
import AddPassenger from './AddPassenger';
import FlightDetails from '../flights/FlightsPage';
import EditPassenger from './EditPassenger';
const AdminDashboard = () => {
  const { Header, Content, Footer } = Layout;
  let history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('role');
    history.push('/');
  };
  const role = localStorage.getItem('role');
  if (role !== 'admin') {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Layout className="layout" sm={480}>
        <Header>
          <div className="logo">
            <Link to="/admin">AIRLINE EXPRESS</Link>
          </div>

          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
            {/* <Menu.Item key="2">
              <Link to="/admin">Home</Link>
            </Menu.Item> */}
            <Menu.Item key="3">
              <Link to="/admin/passengerList">Passenger List</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/admin/flightList">Flight List</Link>
            </Menu.Item>
            <Menu.Item key="6">
              {' '}
              <Button onClick={handleLogout}>
                <Icon type="logout" />
                Logout
              </Button>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', height: '340' }}>
          <div style={{ background: '#fff', padding: 24 }}>
            <Row>
              <Col xs={24} lg={{ span: 4 }}>
                <img
                  alt="example"
                  src="https://secure.webtoolhub.com/static/resources/icons/set108/26ce8716.png"
                  style={{
                    width: '180px',
                    height: '180px',
                  }}
                />
              </Col>
              <Col xs={24} lg={{ span: 8 }}>
                <div className="role">WELCOME, {role.toUpperCase()}</div>
              </Col>
            </Row>

            <Switch>
              <Route path="/admin/passengerList" component={PassengerList} />
              <Route path="/admin/addPassenger" component={AddPassenger} />
              <Route
                path="/admin/editPassenger/:id"
                component={EditPassenger}
              />
              <Route path="/admin/flightList" component={FlightDetails} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
};

export default AdminDashboard;
