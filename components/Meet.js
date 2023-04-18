import { Avatar, Tooltip } from '@chakra-ui/react';
import React from 'react';

const Meet = ({ title, description, email, pfp, category }) => {
  return (
    <Tooltip
      fontSize='xs'
      borderRadius={'15px'}
      label='Join Meet'
      placement='bottom-end'
    >
      <div className='bg-gray-50 hover:bg-gray-100 text-black max-w-sm p-4 m-1 px-6 flex items-start rounded-lg cursor-pointer'>
        <Avatar size='sm' name='Dan Abrahmov' src={pfp} />
        <div className='text-sm ml-4'>
          <div className='font-semibold'>{title}</div>
          <div className='text-gray-600 text-xs'>
            {email} · {category}
          </div>
          <div className='mt-2 text-xs'>{description}</div>
        </div>
      </div>
    </Tooltip>
  );
};

export default Meet;
