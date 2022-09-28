import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "context/AuthContext";
import Navbar from "context/Navbar";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  );
};

export default MyApp;
