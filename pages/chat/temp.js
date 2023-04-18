import { HuddleIframe } from '@huddle01/huddle01-iframe';
const MyApp = () => {
  const iframeConfig = {
    roomUrl: 'https://iframe.huddle01.com/zxe-feyo-rha',
    height: '820px',
    width: '100%',
    noBorder: true, // false by default
  };

  return <HuddleIframe config={iframeConfig} />;
};

export default MyApp;
