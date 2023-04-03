import { HuddleIframe } from '@huddle01/huddle01-iframe';

const iframeConfig = {
  roomUrl: 'https://app.huddle01.com/ssr-kswm-vcb',
  height: '700px',
  width: '100%',
  noBorder: true, // false by default
};

function App() {
  return (
    <div className='min-h-screen bg-stone-950 flex justify-center items-center'>
      <HuddleIframe config={iframeConfig} />
    </div>
  );
}

export default App;
