import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Meet from '@/components/Meet';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, signIn } = useAuth();

  useEffect(() => {
    if (
      user &&
      user.reloadUserInfo.screenName !== undefined &&
      user.reloadUserInfo.screenName !== ''
    ) {
      console.log(user);
    }
  }, [user]);

  return (
    <div className='min-h-screen bg-stone-950 p-28 px-0 relative z-0'>
      <div
        className={`h-20 w-full bg-amber-700 blur-3xl  animate-pulse absolute top-0`}
      ></div>
      <Navbar onOpen={onOpen} />
      <div className='max-w-xs flex justify-around items-center mx-auto mt-12'>
        <div className='text-white bg-stone-600 p-2 px-4 rounded-lg hover:bg-stone-400'>
          Chat
        </div>
        <div className='text-white bg-stone-800 p-2 px-4 rounded-lg hover:bg-stone-400'>
          Co-Work
        </div>
      </div>
      <div className='mt-20 max-w-sm mx-auto'>
        <Meet />
        <Meet />
        <Meet />
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size='xs'>
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent bgColor={'green.900'} color='white' pb={2}>
          <ModalHeader ml={1}>Let's make you some friends!</ModalHeader>

          <ModalBody w={'100%'}>
            <button
              onClick={() => signIn()}
              type='button'
              class='text-white ml-10 bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2'
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
