import React from 'react';
import { Layout, Menu, Icon, Button, Row, Col } from 'antd';
import { Route, Switch, Link, useHistory, Redirect } from 'react-router-dom';
import FlightList from './FlightList';
import ManagePassengers from './ManagePassengers';
import PassengerList from '../../admin/PassengerList';
import InFlight from '../inflight/InFlight';
import FlightServices from '../inflight/InFlightServices';
import SeatMatrix from './SeatMatrix';

const StaffDashboard = () => {
  const { SubMenu } = Menu;
  const { Header, Content, Footer, Sider } = Layout;

  let history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('role');
    history.push('/');
  };
  const role = localStorage.getItem('role');
  if (role !== 'staff') {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Layout>
        <Header className="header">
          <div className="logo">
            <Link to="/admin">AIRLINE EXPRESS</Link>
          </div>
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item key="3">
              <Button onClick={handleLogout}>
                <Icon type="logout" />
                Logout
              </Button>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider
              width={200}
              style={{ background: '#fff' }}
              breakpoint="sm"
              collapsedWidth="0"
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="user" />
                      Check-In
                    </span>
                  }
                >
                  <Menu.Item key="1">
                    <Link to="/staff/checkIn/flightList">Flight List</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/staff/checkIn/passengerList">
                      Passenger List
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="shopping" />
                      In-Flight
                    </span>
                  }
                >
                  <Menu.Item key="5">
                    <Link to="/staff/inFlight">Flight List</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Row>
                <Col xs={24} lg={{ span: 4 }}>
                  <img
                    alt="example"
                    src="https://cdn2.iconfinder.com/data/icons/aviation-1/500/Aviation_designer-512.png"
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
                <Route
                  path="/staff/checkIn/flightList"
                  component={FlightList}
                />
                <Route
                  path="/staff/checkIn/managePassengers/:id"
                  component={ManagePassengers}
                />
                <Route
                  path="/staff/checkIn/seatMatrix/:pid/:id"
                  component={SeatMatrix}
                />
                <Route
                  path="/staff/checkIn/passengerList"
                  component={PassengerList}
                />

                <Route exact path="/staff/inFlight" component={InFlight} />
                <Route
                  path="/staff/inFlight/managePassengers/:id/:services"
                  component={ManagePassengers}
                />
                <Route
                  path="/staff/inFlight/flightServices/:id"
                  component={FlightServices}
                />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
      ,
    </>
  );
};

export default StaffDashboard;
