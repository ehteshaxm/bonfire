import React from 'react';

const Stamp = ({ name, color }) => {
  return (
    <div
      className={`p-2 px-4 m-1 text-sm ${color} rounded-full border border-black hover:scale-105 transition-transform ease-out cursor-none`}
    >
      {name}
    </div>
  );
};

export default Stamp;
