import React from 'react';
const Seat = props => {
  let key = props.occupied;
  let color;
  let btnDisabled = false;
  switch (key) {
    case 'BLOCKED':
      color = 'green';
      btnDisabled = true;
      break;
    case 'BLOCKED WITH WHEELCHAIR':
      color = 'red';
      break;

    case 'BLOCKED WITH INFANT':
      color = 'blue';
      break;

    case 'BLOCKED WITH BOTH':
      color = 'orange';
      break;
    case 'MODIFY':
      color = 'yellow';
      break;
    case 'MEAL':
      color = 'GREEN';
      break;
    case 'NO MEAL':
      color = 'RED';
      break;

    default:
      color = 'grey';
  }

  return (
    <button
      className="square"
      disabled={btnDisabled}
      style={{ backgroundColor: color, margin: '15px' }}
      onClick={props.onClickSeat}
    ></button>
  );
};

export default Seat;
