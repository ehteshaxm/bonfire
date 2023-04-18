import React from 'react';
import { Tooltip, Image } from '@chakra-ui/react';

const CustomEvent = () => {
  return (
    <Tooltip
      fontSize='xs'
      borderRadius={'15px'}
      label='join common room'
      placement='bottom-end'
    >
      <div className='max-w-sm m-2 bg-sky-400 opacity-90 cursor-pointer hover:scale-105 transition border rounded-xl overflow-hidden border-black'>
        <div className='h-52'>
          <Image
            alt='event-image'
            objectFit='cover'
            w='100%'
            h='100%'
            src='/medi.png'
          />
        </div>
      </div>
    </Tooltip>
  );
};

export default CustomEvent;
