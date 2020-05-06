import React, { useState, useEffect } from 'react';

const FormDemo = () => {
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    return () => {
        console.log('cleaning');
    }
  },[count]);

  const handleChange = e => {
    setName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Enter name"
          onChange={handleChange}
        ></input>
        <button type="submit">Submit</button>
      
        {name}
        {count}
      </form>
      
      <button onClick={handleIncrement}>+</button>
    </>
  );
};

export default FormDemo;
