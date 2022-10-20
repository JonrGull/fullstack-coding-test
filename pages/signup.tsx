import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
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

const Signup = () => {
  const { signUp } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const checkPasswordRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    const userEmail = emailRef.current.value;
    let userPassword = passwordRef.current.value;
    let userCheckPassword = checkPasswordRef.current.value;

    e.preventDefault();

    if (userPassword.trim() === "") {
      userPassword = "";
      userCheckPassword = "";
      return setError("Password cannot be empty");
    }
    if (userPassword !== userCheckPassword) {
      return setError("Passwords do not match");
    }

    try {
      setIsLoading(true);
      await signUp(userEmail, userPassword);
      router.push("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <title>Signup</title>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Create your account
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSignUp}>
              {error && <ErrorMessage message={error} />}
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" ref={emailRef} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input id="password" type={showPassword ? "text" : "password"} ref={passwordRef} minLength={6} />
                  <InputRightElement h={"full"}>
                    <Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    id="checkPassword"
                    type={showPassword ? "text" : "password"}
                    ref={checkPasswordRef}
                    minLength={6}
                  />
                  <InputRightElement h={"full"}>
                    <Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button type="submit" loadingText="Submitting" isLoading={isLoading} colorScheme="blue">
                  Sign up
                </Button>
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link href="/login" color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Public(Signup);
