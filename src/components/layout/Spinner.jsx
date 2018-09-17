import React from "react";

//spinner
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <img
      style={{
        display: 'block',
        width: '200px',
        margin: 'auto',
      }}
      src={spinner} 
      alt="Loading..."
    />
  );
};

export default Spinner;
