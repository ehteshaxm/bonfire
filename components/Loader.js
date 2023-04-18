import React from 'react';

const Loader = () => {
  return (
    <div className='fire'>
      <div className='flames'>
        <div className='flame'></div>
        <div className='flame'></div>
        <div className='flame'></div>
        <div className='flame'></div>
      </div>
      <div className='logs'></div>
    </div>
  );
};

export default Loader;
