import { Avatar } from '@chakra-ui/react';
import React from 'react';

const Meet = () => {
  return (
    <div className='bg-stone-700 p-4 my-3 px-6 flex items-center rounded-lg'>
      <Avatar size='sm' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
      <div className='text-sm ml-4 text-white'>
        <div className='font-semibold'>
          Pitching my idea, Its Fintech oriented 
        </div>
        <div className='text-gray-300'>@ehteshaxm · 💡 Ideas · 0 Meetings</div>
      </div>
    </div>
  );
};

export default Meet;
