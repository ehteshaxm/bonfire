import MeetButtons from '@/components/MeetButtons';
import { Button } from '@chakra-ui/react';
import React from 'react';

const Chat = () => {
  return (
    // <div className='min-h-screen bg-gray-50 relative'>
    //   <div className='absolute bottom-10 left-10 bg-gray-800 text-white flex justify-center items-center h-44 w-44 rounded-lg'>
    // <svg
    //   xmlns='http://www.w3.org/2000/svg'
    //   fill='none'
    //   viewBox='0 0 24 24'
    //   strokeWidth={1.5}
    //   stroke='currentColor'
    //   className='w-14 h-14 stroke-1'
    // >
    //   <path
    //     strokeLinecap='round'
    //     strokeLinejoin='round'
    //     d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
    //   />
    // </svg>
    //   </div>
    //   <MeetButtons />
    // </div>
    <div className='min-h-screen bg-gray-50'>
      <div className='absolute rainbow w-full blur-3xl h-20 animate-pulse'>
        e
      </div>
      <div className='max-w-4xl flex justify-center items-center mx-auto pt-44'>
        <div className='bg-gray-900 text-white h-80 w-96 flex justify-center items-center rounded-lg relative'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-28 h-28 stroke-1'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
          <div className=' flex absolute bottom-5'>
            <div className='rounded-full p-3 border transition bg-gray-50 text-black hover:bg-gray-200 hover:cursor-pointer mr-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z'
                />
              </svg>
            </div>
            <div className='rounded-full p-3 border transition bg-gray-50 text-black hover:bg-gray-200 hover:cursor-pointer ml-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  d='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
                />
              </svg>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center text-center ml-20 w-80'>
          <p className='text-2xl mb-5'>
            You're about to make a new friend,{' '}
            <span className='font-bold'>Ready to Join.</span>
          </p>
          <Button
            borderRadius='30px'
            colorScheme='pink'
            rightIcon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5 stroke-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75'
                />
              </svg>
            }
          >
            Join{' '}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
