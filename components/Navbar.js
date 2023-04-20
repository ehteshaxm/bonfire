/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle } from 'react';
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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Box,
} from '@chakra-ui/react';

const Navbar = forwardRef((props, ref) => {
  const { user, logout, signIn } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useImperativeHandle(ref, () => ({
    openSignUpModal() {
      onOpen();
    },
  }));

  return (
    <div className='bg-gray-50 border-t-2 border-b-2 border-black'>
      <div className='p-2 max-w-4xl mx-auto flex justify-between items-center'>
        <p className='text-xl font-black flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 mr-1'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z'
            />
          </svg>
          bonfire
        </p>
        <Modal isCentered isOpen={isOpen} onClose={onClose} size='xs'>
          <ModalOverlay
            bg='blackAlpha.100'
            backdropFilter='blur(7px) hue-rotate(20deg)'
          />
          <ModalContent borderWidth='2px' borderColor='black'>
            <div className='flex flex-col items-center text-center p-5 px-6'>
              <p className='text-xl font-semibold mb-4'>/get started</p>
              <p className='text-md'>
                your profile will be built on your google email id, use an email
                id you would like to use as a point of contact.
              </p>
              <button
                type='button'
                className='mt-6 text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2'
                onClick={async () => {
                  await signIn();
                  onClose();
                }}
              >
                <svg
                  class='w-4 h-4 mr-2 -ml-1'
                  aria-hidden='true'
                  focusable='false'
                  data-prefix='fab'
                  data-icon='google'
                  role='img'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 488 512'
                >
                  <path
                    fill='currentColor'
                    d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
                  ></path>
                </svg>
                Sign in with Google
              </button>
            </div>
          </ModalContent>
        </Modal>
        {user !== null ? (
          <Popover isLazy placement='bottom-start'>
            <PopoverTrigger>
              <Avatar
                size='sm'
                name={user.displayName}
                src={user.reloadUserInfo.photoUrl}
                _hover={{
                  opacity: '75%',
                  cursor: 'pointer',
                }}
              />
            </PopoverTrigger>
            <PopoverContent
              className='menu'
              width={'80px'}
              mt={'-5px'}
              borderColor={'black'}
              borderWidth={'2px'}
              focusBorderColor='black'
              fontSize={'xs'}
              overflow={'hidden'}
            >
              <Link href='/profile'>
                <div className='p-1 hover:bg-gray-200 text-center cursor-pointer'>
                  profile
                </div>
              </Link>
              <div
                className='p-1 hover:bg-red-500 text-center cursor-pointer'
                onClick={logout}
              >
                logout
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Button
            fontSize={'sm'}
            size={'sm'}
            p={1}
            px={4}
            borderRadius='25px'
            bg='black'
            color='white'
            onClick={onOpen}
          >
            Sign in
          </Button>
        )}
      </div>
    </div>
  );
});

export default Navbar;
