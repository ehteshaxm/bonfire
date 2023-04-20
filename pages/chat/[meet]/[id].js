import { HuddleIframe, huddleIframeApp } from '@huddle01/huddle01-iframe';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const MyApp = () => {
  const router = useRouter();

  console.log(router);

  const iframeConfig = {
    roomUrl: `https://iframe.huddle01.com/${router.query.id}`,
    height: '820px',
    width: '100%',
    noBorder: true, // false by default
  };

  return <HuddleIframe config={iframeConfig} />;
};

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
