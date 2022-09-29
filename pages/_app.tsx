import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import ProtectedRoute from "components/ProtectedRoute";
import { AuthContextProvider } from "context/AuthContext";
import Navbar from "context/Navbar";
import { useRouter } from "next/router";

const noAuthPages = ["/login", "/signup"];

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <ChakraProvider>
      <AuthContextProvider>
        {noAuthPages.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <>
              <Navbar />
              <Component {...pageProps} />
            </>
          </ProtectedRoute>
        )}
      </AuthContextProvider>
    </ChakraProvider>
  );
};

export default MyApp;
