import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import ProtectedRoute from "components/ProtectedRoutes";
import { AuthContextProvider } from "context/AuthContext";
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
