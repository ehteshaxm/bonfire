import React from 'react';
import { Avatar, Button } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react';

const Navbar = ({ onOpen }) => {
  const { user, logout } = useAuth();

  return (
    <div className='text-white max-w-4xl mx-auto flex items-center justify-between'>
      <Popover>
        <PopoverTrigger>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-6 h-6 hover:text-gray-400 cursor-pointer'
            style={{ strokeWidth: '5px' }}
          >
            <path
              fillRule='evenodd'
              d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
              clipRule='evenodd'
            />
          </svg>
        </PopoverTrigger>
        <PopoverContent
          color='black'
          maxW={'120px'}
          p={1}
          bgColor='blackAlpha.900'
          border='none'
        >
          <Button colorScheme='white' size='xs' border='none'>
            + Create a meet
          </Button>
        </PopoverContent>
      </Popover>
      <h2 className='text-5xl font-bold'>🔥 bonfire</h2>
      {user && user.reloadUserInfo !== undefined && (
        <Popover>
          <PopoverTrigger>
            <Avatar
              size='sm'
              name={user.displayName}
              src={user.reloadUserInfo.photoUrl}
            />
          </PopoverTrigger>
          <PopoverContent
            color='black'
            maxW={'80px'}
            p={1}
            bgColor='blackAlpha.900'
            border='none'
          >
            <Button colorScheme='white' size='xs' border='none'>
              <Link href='/profile'>Profile</Link>
            </Button>
            <Button
              colorScheme='white'
              size='xs'
              onClick={logout}
              border='none'
            >
              Logout
            </Button>
          </PopoverContent>
        </Popover>
      )}
      {!user && (
        <Button colorScheme='yellow' size='sm' onClick={onOpen}>
          Sign in
        </Button>
      )}
    </div>
  );
};

export default Navbar;
