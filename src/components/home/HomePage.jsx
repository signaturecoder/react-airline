import React from 'react';
import { Layout,Row, Col, Card } from 'antd';
import LoginForm from '../login/LoginForm';
// import FormDemo from '../formDemo'
const Homepage = () => {
  const { Header, Content, Footer } = Layout;
  const { Meta } = Card;
  return (
    <Layout className="layout">
      <Header>
        <h3 className="logo">AIRLINE EXPRESS</h3>
      </Header>
      <Content style={{ padding: '0 50px', height: '520px' }}>
      {/* <FormDemo /> */}
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://images.livemint.com/img/2019/08/22/600x338/9e24ab64-a71d-11e9-b16d-bd945e55a214_1563989986818_1566495367055.jpg"
                />
              }
            >
              <Meta title="INDIGO AIRLINE" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            {' '}
            <LoginForm />
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center'}}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Homepage;
