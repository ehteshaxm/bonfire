import React from 'react';
import { Image, Tooltip } from '@chakra-ui/react';

const Event = ({ src }) => {
  return (
    <Tooltip
      fontSize='xs'
      borderRadius={'15px'}
      label='join common room'
      placement='bottom-end'
    >
      <div className='max-w-sm m-2 opacity-90 cursor-pointer hover:scale-105 transition border rounded-xl overflow-hidden border-black'>
        <div className='h-52'>
          <Image
            alt='event-image'
            objectFit='cover'
            w='100%'
            h='100%'
            src={src}
          />
        </div>
      </div>
    </Tooltip>
  );
};

export default Event;
