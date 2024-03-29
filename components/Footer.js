import React, { useState } from 'react';
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
  Text,
  Box,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Footer = () => {
  const [content, setContent] = useState('works');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  console.log(router);

  async function handleMeetingDelete() {
    setLoading(true);
    await deleteDoc(doc(db, 'active', router.query.meet));
    setLoading(false);
    router.push('/');
  }

  return (
    <div className='w-full bg-gray-50 sticky bottom-0 border border-t-2 border-b-2 border-black'>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size='xs'>
        <ModalOverlay
          bg='blackAlpha.100'
          backdropFilter='blur(7px) hue-rotate(20deg)'
        />
        <ModalContent borderWidth='2px' borderColor='black'>
          {content === 'works' && (
            <div className='flex flex-col items-center p-5 px-6'>
              <p className='text-xl font-semibold mb-4'>how it works?</p>
              <p>click on + create a meeting to host your own meeting</p>
              <p className='my-3'>
                click on one of the cards below to hop in one of the meetings
              </p>
              <p>
                click /co-work to participate in meetings with multiple people
                and work together
              </p>
            </div>
          )}
          {content === 'faq' && (
            <div className='flex flex-col items-center p-5 px-6'>
              <p className='text-xl font-semibold mb-4'>faq - why bonfire?</p>
              <p>
                you are the average of the five people you spend the most time
                with
              </p>
              <p className='my-3'>
                at bonfire you can choose your friends and build relationships
                with people of similar interests
              </p>
              <p>
                build a circle of friends who like to talk about investments,
                ideas, growth
              </p>
            </div>
          )}
        </ModalContent>
      </Modal>
      <div className='max-w-4xl mx-auto p-2 flex items-center justify-between'>
        <div className='flex items-center'>
          <p
            className='mr-5 hover:text-gray-400 cursor-pointer'
            onClick={() => {
              setContent('works');
              onOpen();
            }}
          >
            how it works?
          </p>
          <p
            className='hover:text-gray-400 cursor-pointer'
            onClick={() => {
              setContent('faq');
              onOpen();
            }}
          >
            faq
          </p>
        </div>
        {router.pathname === '/chat/[meet]/[id]' &&
        router.query.meet !== 'cowork' ? (
          <div className='flex items-center'>
            <div className='flex items-center bg-gray-100 text-gray-500 text-xs border-2 p-1 px-2 mr-3 rounded-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4 mr-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
                />
              </svg>

              <p>
                Please delete the meeting after ending to delete the post on
                main page
              </p>
            </div>
            <Button
              fontSize={'sm'}
              size={'sm'}
              p={1}
              px={4}
              borderRadius='25px'
              colorScheme='red'
              onClick={handleMeetingDelete}
              isLoading={loading}
            >
              Delete
            </Button>
          </div>
        ) : router.query.meet === 'cowork' ? (
          <div className='flex items-center'>
            <div className='flex items-center bg-gray-100 text-black text-xs border-2 p-1 px-2 rounded-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4 mr-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
                />
              </svg>

              <p>Click on Join as Guest</p>
            </div>
          </div>
        ) : (
          <svg
            class='w-4 h-4'
            aria-hidden='true'
            focusable='false'
            data-prefix='fab'
            data-icon='twitter'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            onClick={() =>
              window.open('https://twitter.com/ehteshaxm', '_blank')
            }
          >
            <path
              className='text-black hover:text-gray-400 cursor-pointer'
              fill='currentColor'
              d='M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z'
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
};

export default Footer;
