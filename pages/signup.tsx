import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import
  {
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
    useColorModeValue
  } from "@chakra-ui/react";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function Signup() {
  const { signUp } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      await signUp(emailRef.current.value, passwordRef.current.value);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" ref={emailRef} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} ref={passwordRef} />
                <InputRightElement h={"full"}>
                  <Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleSignUp}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}>
                Sign up
              </Button>
            </Stack>
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
}
