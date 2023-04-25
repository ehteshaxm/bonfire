import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthContextProvider } from '../context/AuthContext';
import { Analytics } from '@vercel/analytics/react';
import Footer from '@/components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ChakraProvider>
        <Component {...pageProps} />
        <Analytics />
        <Footer />
      </ChakraProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
