import React, { useEffect, useState } from 'react';
import { Avatar, Image } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import Router from 'next/router';
import Link from 'next/link';
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
  Textarea,
  Input,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import Meet from '@/components/Meet';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';

const Profile = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    if (user === null) {
      Router.push('/');
    }
    (async function getUserData() {
      const docRef = doc(db, 'users', user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);
        setDescription(data.description);
        setInstagram(data.instagram);
        setTwitter(data.twitter);
        setLinkedIn(data.linkedIn);
        setWebsite(data.website);
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!');
      }
    })();
  }, []);

  function bioSubmitHandler() {
    setSubmitLoading(true);
    const docRef = doc(db, 'users', user.email);
    setDoc(docRef, {
      description: description,
      instagram: instagram,
      twitter: twitter,
      linkedIn: linkedIn,
      website: website,
    })
      .then(() => {
        setSubmitLoading(false);
        onClose();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className='min-h-screen bg-gray-200'>
      <div className='bg-gray-50 border-t-2 border-b-2 border-black'>
        <div className='p-2 max-w-4xl mx-auto flex justify-between items-center'>
          <Link href='/'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 stroke-2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5L8.25 12l7.5-7.5'
              />
            </svg>
          </Link>
        </div>
      </div>
      {user !== null && (
        <Modal isCentered isOpen={isOpen} onClose={onClose} size='md'>
          <ModalOverlay
            bg='blackAlpha.100'
            backdropFilter='blur(7px) hue-rotate(20deg)'
          />
          <ModalContent borderWidth='2px' borderColor='black'>
            <div className='p-5 px-6'>
              <div className='flex items-center justify-between'>
                <div className=''>
                  <p className='font-bold text-2xl'>{user.displayName}</p>
                  <p className='text-gray-500 text-sm'>{user.email}</p>
                  <Textarea
                    p={2}
                    mt={3}
                    value={description}
                    onChange={(e) => {
                      if (description.length <= 200) {
                        setDescription(e.target.value);
                      }
                    }}
                    fontSize={'xs'}
                    focusBorderColor='whatsApp'
                    placeholder='Tell us about yourself'
                  />
                </div>
                <Avatar
                  size='xl'
                  name={user.displayName}
                  src={user.reloadUserInfo.photoUrl}
                />
              </div>
              <div className='mt-7 pr-4 flex flex-wrap justify-center'>
                <InputGroup size='sm' m={1} w={'47%'}>
                  <InputLeftAddon
                    bgColor={'white'}
                    border='none'
                    children={
                      <Image
                        alt='instagram'
                        src='/instagram.svg'
                        width='25px'
                      />
                    }
                  />
                  <Input
                    focusBorderColor='whatsApp'
                    placeholder='instagram/link'
                    fontSize={'xs'}
                    borderRadius={'5px'}
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </InputGroup>
                <InputGroup size='sm' m={1} w={'47%'}>
                  <InputLeftAddon
                    bgColor={'white'}
                    border='none'
                    children={
                      <Image alt='twitter' src='/twitter.svg' width='25px' />
                    }
                  />
                  <Input
                    focusBorderColor='whatsApp'
                    fontSize={'xs'}
                    placeholder='twitter/link'
                    borderRadius={'5px'}
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </InputGroup>
                <InputGroup size='sm' m={1} w={'47%'}>
                  <InputLeftAddon
                    bgColor={'white'}
                    border='none'
                    children={
                      <Image alt='linkedin' src='/linkedin.svg' width='25px' />
                    }
                  />
                  <Input
                    focusBorderColor='whatsApp'
                    fontSize={'xs'}
                    placeholder='linkedin/link'
                    borderRadius={'5px'}
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                  />
                </InputGroup>
                <InputGroup size='sm' m={1} w={'47%'}>
                  <InputLeftAddon
                    bgColor={'white'}
                    border='none'
                    // eslint-disable-next-line react/no-children-prop
                    children={
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
                          d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
                        />
                      </svg>
                    }
                  />
                  <Input
                    focusBorderColor='whatsApp'
                    fontSize={'xs'}
                    placeholder='website/link'
                    borderRadius={'5px'}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className=' mt-5 flex justify-between items-center'>
                <p className='flex items-center text-xs text-gray-500 w-72'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-8 h-8 mr-2 text-amber-500'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Your bio will be looked at by everyone, Write it such that you
                  find people with similar interests.
                </p>
                <Button
                  bgColor='blackAlpha.900'
                  color={'white'}
                  onClick={bioSubmitHandler}
                  isLoading={submitLoading}
                  leftIcon={
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-4 h-4 stroke-2'
                    >
                      <path
                        fillRule='evenodd'
                        d='M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z'
                        clipRule='evenodd'
                      />
                    </svg>
                  }
                  size='sm'
                  fontSize={'xs'}
                >
                  Submit
                </Button>
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}
      {user !== null && (
        <div className='border-b-2 bg-gray-50 border-black'>
          <div className='p-2 pl-10 pt-7 pb-7 max-w-4xl mx-auto flex justify-between items-center'>
            <div className=''>
              <h1 className='font-bold text-3xl'>{user.displayName}</h1>
              <p className='text-gray-500'>{user.email}</p>
              {description !== '' ? (
                <p className='mt-2 italic'>{description}</p>
              ) : (
                <p className='mt-2 text-gray-300 italic'>
                  Write something about yourself...
                </p>
              )}
              <div className='mt-4 flex items-center'>
                {instagram !== '' && (
                  <Image
                    alt='instagram'
                    className='mr-2 cursor-pointer'
                    src='/instagram.svg'
                    width='25px'
                  />
                )}
                {twitter !== '' && (
                  <Image
                    alt='twitter'
                    className='mr-2 cursor-pointer'
                    src='/twitter.svg'
                    width='25px'
                  />
                )}
                {linkedIn !== '' && (
                  <Image
                    alt='linkedin'
                    className='mr-2 cursor-pointer'
                    src='/linkedin.svg'
                    width='25px'
                  />
                )}
                {website !== '' && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6 mr-2 cursor-pointer'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
                    />
                  </svg>
                )}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 hover:text-gray-400 transition cursor-pointer'
                  onClick={onOpen}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                  />
                </svg>
              </div>
            </div>
            <div className='flex flex-wrap max-w-lg pr-10'>
              <Avatar
                size='2xl'
                name={user.displayName}
                src={user.reloadUserInfo.photoUrl}
              />
            </div>
          </div>
        </div>
      )}
      <div className='border-b-2 bg-gray-50 border-black'>
        <div className='px-10 max-w-4xl mx-auto p-2 flex items-center justify-between'>
          <div className='flex items-center'>
            Previous Meetings{' '}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5 ml-2 rotate-45'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3'
              />
            </svg>
          </div>
        </div>
      </div>
      <div className='mt-7 max-w-4xl mx-auto p-2 flex flex-wrap items-start justify-center'>
        <blockquote class='mt-10 text-md italic font-semibold text-right text-gray-400 dark:text-white'>
          <p>{'This part is under construction 🛠️, Will be out soon...'}</p>
        </blockquote>
      </div>
    </div>
  );
};

export default Profile;
