import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import ErrorMessage from "components/ErrorMessage";
import { Public } from "config/firebase/authRoute";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: { preventDefault: () => void }) => {
    const userEmail = emailRef.current.value;
    const userPassword = passwordRef.current.value;

    e.preventDefault();
    try {
      setIsLoading(true);
      await login(userEmail, userPassword);
      router.push("/");
      setIsLoading(false);
    } catch (error) {
      setError("Invalid username or password");
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <title>Login</title>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleLogin}>
              {error && <ErrorMessage message={error} />}
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" ref={emailRef} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" ref={passwordRef} minLength={6} />
              </FormControl>
              <Stack spacing={10}>
                <Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button type="submit" isLoading={isLoading} colorScheme="blue">
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>

          <Stack pt={6}>
            <Text align={"right"}>
              <Link href="/signup" color={"blue.400"}>
                Create Account
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Public(Login);
