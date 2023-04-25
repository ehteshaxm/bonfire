import React from 'react';
import { Image, Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const Event = ({ src, roomId, check }) => {
  const router = useRouter();
  const { user, signIn } = useAuth();

  function handlePush() {
    if (user === null) {
      check.current.openSignUpModal();
    } else {
      router.push(`/chat/cowork/${roomId}`);
    }
  }

  return (
    <Tooltip
      fontSize='xs'
      borderRadius={'15px'}
      borderTopLeftRadius={0}
      label='join space'
      placement='bottom-end'
    >
      <div
        className='max-w-sm m-2 opacity-90 cursor-pointer hover:scale-105 transition border rounded-xl overflow-hidden border-black relative'
        onClick={handlePush}
      >
        <div className='absolute ml-2 right-7 top-3'>
          <div className='h-5 w-5 bg-orange-300 absolute rounded-full animate-ping'></div>
          <div className='h-5 w-5 bg-orange-500 absolute rounded-full'></div>
        </div>
        <div className='h-52'>
          <Image
            alt='event-image'
            objectFit='cover'
            w='100%'
            h='100%'
            src={src}
          />
        </div>
        <div className='bg-gray-50 p-3 px-4 text-md'>
          co-working session by{' '}
          <span
            className='font-semibold text-blue-500 hover:text-blue-800'
            onClick={() => {
              window.open('https://twitter.com/marissacurrys', '_blank');
            }}
          >
            @marissacurrys
          </span>{' '}
          and{' '}
          <span
            className='font-semibold text-blue-500 hover:text-blue-800'
            onClick={() => {
              window.open('https://twitter.com/0xreklaw', '_blank');
            }}
          >
            @0xreklaw
          </span>
          , founders Community Labs
          <p className='text-sm mt-2 text-gray-500'>25 Apr, 08:00 PM EDT</p>
        </div>
      </div>
    </Tooltip>
  );
};

export default Event;
