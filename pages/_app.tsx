import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "context/AuthContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  );
};

export default MyApp;
