import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthContextProvider } from '../context/AuthContext';
import Footer from '@/components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ChakraProvider>
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
