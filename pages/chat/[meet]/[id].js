import { HuddleIframe, huddleIframeApp } from '@huddle01/huddle01-iframe';
import { useRouter } from 'next/router';

const MyApp = () => {
  const router = useRouter();

  console.log(huddleIframeApp.methods);

  // if (window !== undefined) {
  // huddleIframeApp.on('peer-join', (data) => {
  //   console.log('getting part details');
  //   console.log(getParticipants());
  // });

  // console.log(huddleIframeApp.methods);

  huddleIframeApp.on('peer-join', (data) => {
    console.log('peer-join');
    console.log({ data });
  });

  const iframeConfig = {
    roomUrl: `https://iframe.huddle01.com/${router.query.id}`,
    height: '820px',
    width: '100%',
    noBorder: true, // false by default
  };

  return <HuddleIframe config={iframeConfig} />;
};

export default MyApp;
