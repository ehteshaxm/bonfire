import React from 'react';

const Stamp = ({ name, color }) => {
  const nc = color.substring(3);
  console.log(nc);

  return (
    <div
      className={`p-2 px-4 m-1 text-sm ${color} rounded-full border border-black hover:scale-105 transition-transform ease-out hover:border-none`}
    >
      {name}
    </div>
  );
};

export default Stamp;
