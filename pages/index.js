import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Meet from '@/components/Meet';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  useDisclosure,
  Select,
  Tooltip,
} from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import Stamp from '@/components/Stamp';
import Event from '@/components/Event';
import Loader from '@/components/Loader';
import CustomEvent from '@/components/CustomEvent';
import {
  getDocs,
  addDoc,
  getDoc,
  query,
  doc,
  collection,
  orderBy,
  limit,
  startAfter,
  endBefore,
} from 'firebase/firestore';
import { db } from '../firebase';
import axios from 'axios';

export default function Home() {
  const [mType, setMType] = useState('/chat');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const [meetings, setMeetings] = useState([]);
  const [coWork, setCoWork] = useState([]);
  const [firstVisibleDoc, setFirstVisibleDoc] = useState(null);
  const [lastVisibleDoc, setLastVisibleDoc] = useState(null);

  const { user, signIn } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navRef = useRef();

  useEffect(() => {
    fetchDocuments();
    fetchCoWork();
  }, []);

  async function fetchCoWork() {
    const docRef = doc(db, 'cowork', 'main');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log([docSnap.data()]);
      setCoWork([docSnap.data()]);
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  // Fetch the first batch of documents
  const fetchDocuments = async () => {
    const q = query(collection(db, 'active'), orderBy('title'), limit(2));
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(documents);

    // Update the first and last visible documents
    setFirstVisibleDoc(querySnapshot.docs[0]);
    setLastVisibleDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);

    setMeetings(documents);
  };

  // Fetch the next batch of documents
  const fetchNextDocuments = async () => {
    const q = query(
      collection(db, 'active'),
      orderBy('title'),
      limit(2),
      startAfter(lastVisibleDoc)
    );
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Update the first and last visible documents
    setFirstVisibleDoc(querySnapshot.docs[0]);
    setLastVisibleDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);

    setMeetings(documents);
  };

  // Fetch the previous batch of documents
  const fetchPreviousDocuments = async () => {
    const q = query(
      collection(db, 'active'),
      orderBy('title'),
      limit(2),
      endBefore(firstVisibleDoc)
    );
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Update the first and last visible documents
    setFirstVisibleDoc(querySnapshot.docs[0]);
    setLastVisibleDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);

    setMeetings(documents);
  };

  async function createMeetingHandler() {
    if (user === null) {
      navRef.current.openSignUpModal();
      return;
    }
    setLoading(true);

    axios
      .post(
        'https://iriko.testing.huddle01.com/api/v1/create-iframe-room',
        {
          title: title,
          roomLocked: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'VwTZ4AGTxme9snANex9tep3NwvVMGfYd',
          },
        }
      )
      .then((response) => {
        console.log('meeting created');
        console.log(response);
        const myCollectionRef = collection(db, 'active');
        addDoc(myCollectionRef, {
          title: title,
          description: description,
          category: category,
          email: user.email,
          pfp: user.reloadUserInfo.photoUrl,
          roomId: response.data.data.roomId,
        })
          .then(() => {
            setLoading(false);
            addDoc(collection(db, 'meetings'), {
              title: title,
              description: description,
              category: category,
              email: user.email,
              pfp: user.reloadUserInfo.photoUrl,
            })
              .then(() => {
                console.log('Pushed Meet Database');
                window.location.reload();
              })
              .catch((err) => console.log(err));
            onClose();
          })
          .catch((error) => console.log(error));
      });
  }

  return (
    <div className='min-h-screen bg-gray-200'>
      <Navbar ref={navRef} />
      <div className='border-b-2 bg-gray-50 border-black'>
        <div className='p-2 pt-7 pb-7 max-w-4xl mx-auto flex justify-between items-center'>
          <div className='max-w-md'>
            <h1 className='font-bold text-3xl'>What is bonfire?</h1>
            <p className='mt-2'>
              Welcome to our platform, where you can have{' '}
              <span className='underline underline-offset-4'>
                curated conversations
              </span>{' '}
              with people of your choice{' '}
              <span className='underline underline-offset-4'>
                on topics that interest you
              </span>
              . Our unique feature allows anyone to host a meeting and invite
              others to join in on the discussion.{' '}
              <span className='underline underline-offset-4'>
                Join the conversation and connect with like-minded individuals
              </span>{' '}
              who share your interests.
            </p>
          </div>
          <div className='flex flex-wrap max-w-lg ml-12'>
            <Stamp name='🎨 Artists' color='bg-yellow-100' />
            <Stamp name='🎧 Musicians' color='bg-cyan-100' />
            <Stamp name='⚜️ Designers' color='bg-purple-100' />
            <Stamp name='💻 Developers' color='bg-green-100' />
            <Stamp name='🎮 Gamers' color='bg-pink-100' />
            <Stamp name='🎥 Filmmakers' color='bg-blue-100' />
            <Stamp name='💰 Entrepreneurs' color='bg-rose-100' />
            <Stamp name='\_(ッ)_/ you name it...' color='bg-orange-100' />
          </div>
        </div>
      </div>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size='sm'>
        <ModalOverlay
          bg='blackAlpha.100'
          backdropFilter='blur(7px) hue-rotate(20deg)'
        />
        <ModalContent borderWidth='2px' borderColor='black'>
          <div className='flex flex-col items-center p-5 px-6'>
            <p
              className='text-xl font-semibold mb-4 text-center'
              onClick={createMeetingHandler}
            >
              /create a meeting
            </p>
            <FormControl mt={3}>
              <FormLabel fontSize={'xs'}>meeting title</FormLabel>
              <Input
                type='email'
                fontSize={'xs'}
                size={'sm'}
                focusBorderColor='black'
                value={title}
                onChange={(e) => {
                  if (title.length <= 75) {
                    setTitle(e.target.value);
                  }
                }}
              />
              <FormHelperText fontSize={'xs'}>
                title will get the most attention, make it catchy
              </FormHelperText>
            </FormControl>
            <FormControl mt={5}>
              <FormLabel fontSize={'xs'}>description</FormLabel>
              <Textarea
                type='email'
                fontSize={'xs'}
                size={'sm'}
                focusBorderColor='black'
                value={description}
                onChange={(e) => {
                  if (description.length <= 160) {
                    setDescription(e.target.value);
                  }
                }}
              />
              <FormHelperText fontSize={'xs'}>
                elaborate the meeting title.
              </FormHelperText>
            </FormControl>
            <div className='w-full mt-5 flex justify-between items-start'>
              <FormControl maxW='50%'>
                <Select
                  placeholder='select'
                  size='sm'
                  focusBorderColor='black'
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option>💡 Ideas</option>
                  <option>🎙️ Chatting</option>
                  <option>🎮 Gaming</option>
                  <option>🎧 Music</option>
                  <option>\_(ッ)_/ {"let's see"}</option>
                </Select>
                <FormHelperText fontSize={'xs'}>
                  select a category
                </FormHelperText>
              </FormControl>
              <Button
                fontSize={'sm'}
                size={'sm'}
                p={1}
                px={4}
                mr={8}
                borderRadius='25px'
                bg='black'
                color='white'
                onClick={createMeetingHandler}
                isLoading={loading}
              >
                /create
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
      <div className='border-b-2 bg-gray-50 border-black'>
        <div className='max-w-4xl mx-auto p-2 flex items-center justify-between'>
          <div className='flex items-center'>
            Join Meetings{' '}
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
          <div className='flex items-center'>
            <p
              className={
                mType === '/chat'
                  ? 'hover:text-black cursor-pointer text-black mr-5'
                  : 'text-gray-400 hover:text-black cursor-pointer mr-5'
              }
              onClick={() => setMType('/chat')}
            >
              /chat
            </p>
            <p
              className={
                mType === '/co-work'
                  ? 'hover:text-black cursor-pointer text-black'
                  : 'text-gray-400 hover:text-black cursor-pointer'
              }
              onClick={() => setMType('/co-work')}
            >
              /co-work
            </p>
          </div>
          {mType === '/chat' ? (
            <div
              className='hover:text-gray-400 cursor-pointer flex'
              onClick={() => {
                if (user !== null) {
                  onOpen();
                } else {
                  navRef.current.openSignUpModal();
                }
              }}
            >
              + create a meeting{' '}
              <div className='relative ml-2'>
                <div className='h-3 w-3 bg-red-300 absolute rounded-full animate-ping'></div>
                <div className='h-3 w-3 bg-red-500 absolute rounded-full'></div>
              </div>
            </div>
          ) : (
            <Tooltip
              fontSize='xs'
              borderRadius={'15px'}
              label='coming soon...'
              placement='bottom-end'
            >
              <p className='text-gray-400'>+ create an event</p>
            </Tooltip>
          )}
        </div>
      </div>
      <div className='mt-7 max-w-4xl mx-auto pt-10 pb-20 flex flex-wrap items-start justify-center'>
        {mType === '/chat' && (
          <>
            {meetings[0] !== undefined ? (
              meetings.map((meet, index) => (
                <Meet
                  key={index}
                  title={meet.title}
                  description={meet.description}
                  pfp={meet.pfp}
                  email={meet.email}
                  category={meet.category}
                  id={meet.id}
                  roomId={meet.roomId}
                  check={navRef}
                />
              ))
            ) : (
              <div className='mt-12'>
                <Loader />
              </div>
            )}
          </>
        )}

        {mType === '/co-work' && (
          <>
            {coWork.map((event, index) => (
              <Event
                key={index}
                src='/lofi.jpg'
                roomId={event.roomId}
                check={navRef}
              />
            ))}
          </>
        )}

        {/* <div className='mt-20'>
          <Loader />
        </div> */}
      </div>
      {mType !== '/co-work' && (
        <div className='flex justify-center items-center max-w-xs mx-auto'>
          <Tooltip
            fontSize='xs'
            borderRadius={'15px'}
            label='Previous'
            placement='left-end'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 stroke-2 cursor-pointer hover:text-gray-400 transition'
              onClick={fetchPreviousDocuments}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5L8.25 12l7.5-7.5'
              />
            </svg>
          </Tooltip>

          <Tooltip
            fontSize='xs'
            borderRadius={'15px'}
            label='Next'
            placement='right-end'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 stroke-2 cursor-pointer hover:text-gray-400 transition'
              onClick={fetchNextDocuments}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
