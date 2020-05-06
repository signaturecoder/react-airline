import React, { useState, useEffect, useReducer } from 'react';

import axios from 'axios';
import { Button, Checkbox, Row, Col } from 'antd';
import EditPassenger from './EditPassenger';
import AddPassenger from './AddPassenger';

const ViewPassengerTable = (props) => {
  // state = {
  //   passengers: []
  // };
  const [currentPaxList, setCurrentPaxList] = useState([]);
  const [allPaxList, setAllPaxList] = useState([]);
  const [paxId, setPaxId] = useState('');
  const [updatePaxButton,setUpdatePaxButton] = useState(false);
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { passport: false, address: false, dob: false }
  );

 

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/passengerList/`,{
      params:{
        flightId: props.flightId
      },
    }).then(res => {
      const passenger = res.data;
      setAllPaxList(passenger);
    });
  }, [props.flightId]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/passengerList/`,{
      params:{
        flightId: props.flightId
      },
    }).then(res => {
      const passenger = res.data;
      setCurrentPaxList(passenger);
    });
  }, [allPaxList]);

  const addNewPassenger = (newPassenger) =>{
   
     let updatedAllPaxList = [...allPaxList , newPassenger ]

    setAllPaxList(updatedAllPaxList)
  }




  // componentDidMount() {
  //   // after all the elements of the page is rendered correctly, this method is called
  //   axios.get(`http://localhost:3001/api/passengers`).then(res => {
  //     const passengers = res.data;
  //     this.setState({ passengers });
  //   });
  // }

  const handleCheckbox = e => {
    
    let { passport, address, dob } = userInput;

    let value = e.target.checked;
    let name = e.target.name;

    if (name === 'passport') {
      passport = !passport;
    }
    if (name === 'address') {
      address = !address;
    }
    if (name === 'dob') {
      dob = !dob;
    }
    setUserInput({ [name]: value });
    let filteredPaxList = allPaxList;

    if (passport) {
      filteredPaxList = filteredPaxList.filter(
        pax =>
          pax.passport.passportNum === '' || pax.passport.expiry_date === ''
      );
    }
    if (address) {
      filteredPaxList = filteredPaxList.filter(pax => pax.address === '');
    }
    if (dob) {
      filteredPaxList = filteredPaxList.filter(pax => pax.dob === '');
    }
    setCurrentPaxList(filteredPaxList);
  };

  const addPassenger = () => {
    setUpdatePaxButton(false);
  }

  const updatePassenger = (id) => {
    setPaxId(id);
    setUpdatePaxButton(true);
  }



  const renderTableData = () => {
    return currentPaxList.map(passenger => {
      const { id,flightId, pName, passport, dob, address } = passenger; // destructring
      return (
        <tr key={id}>
          <td>{flightId}</td>
          <td>{pName}</td>
          <td>{passport.passportNum}</td>
          <td>{passport.expiry_date}</td>
          <td>{dob}</td>
          <td>{address}</td>
          <td>
            <Button onClick={() => updatePassenger(id)}>
              {/* <Link to={'/admin/editPassenger/' + id}>Update</Link> */}Update
            </Button>
          </td>
        </tr>
      );
    });
  };

  const { passport, address, dob } = userInput;
  return (
    <div>


      <Row gutter={16}>
      <Col span={16}>
      <h1>Passenger List</h1><h1><Button onClick={addPassenger}>Add Passenger</Button></h1>
      <Checkbox name="passport" checked={passport} onChange={handleCheckbox}>
        Without Passport
      </Checkbox>
      <Checkbox name="address" checked={address} onChange={handleCheckbox}>
        Without Address
      </Checkbox>
      <Checkbox name="dob" checked={dob} onChange={handleCheckbox}>
        Without DOB
      </Checkbox>
      
      <table className="passenger-table">
        <tbody>
          <tr>
            <th>Flight Number</th>
            <th>Name</th>
            <th>Passport Number</th>
            <th>Expiry Date</th>
            <th>Dob</th>
            <th>Address</th>
            <th>Update</th>
          </tr>
          {renderTableData()}
        </tbody>
      </table>
      </Col>
        <Col span={6} style={{marginTop: '105px', borderStyle: 'solid', marginLeft: '10px'}}> {updatePaxButton ? <EditPassenger paxId={paxId}/> : <AddPassenger addNewPassenger={(newPassenger )=>addNewPassenger(newPassenger)}/> }</Col>
      </Row>
     
    </div>
  );
};
export default ViewPassengerTable;
