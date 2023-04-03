import React, { useEffect } from 'react';
import { Avatar, Image } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import Router from 'next/router';
import Link from 'next/link';

const Profile = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user === null) {
      Router.push('/');
    }
  }, []);

  return (
    <div className='min-h-screen bg-stone-950 p-24'>
      <div
        className={`h-20 w-full bg-amber-700 blur-3xl  animate-pulse absolute top-0`}
      ></div>
      <div className='max-w-2xl mx-auto'>
        <Link href='/'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-7 h-7 text-stone-600 font-bold stroke-2'
            style={{ strokeWidth: '4px' }}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 19.5L8.25 12l7.5-7.5'
            />
          </svg>
        </Link>
      </div>
      {user !== null && (
        <div className='max-w-lg mx-auto mt-14'>
          <div className='bg-stone-600 rounded-xl h-44 relative'>
            <Avatar
              size='2xl'
              name={user.displayName !== null && user.displayName}
              src={user.photoURL}
              position='absolute'
              right='10'
              bottom='-14'
            />
          </div>
          <div className='mt-5 pl-5'>
            <h1 className='text-xl text-white font-semibold'>
              {user.displayName}
            </h1>
            <p className='text-gray-500'>{user.email}</p>
            <p className='mt-3 text-white'>
              On Jan 28, I will have a web app where users can generate comics
              and $1000 in revenue.
            </p>
            <div className='mt-4 flex justify-between w-24'>
              <Image alt='instagram' src='/instagram.svg' width='25px' />
              <Image alt='twitter' src='/twitter.svg' width='25px' />
              <Image alt='linkedin' src='/linkedin.svg' width='25px' />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
