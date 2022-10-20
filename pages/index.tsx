import { Box, Flex, Input, Stack, useColorModeValue } from "@chakra-ui/react";
import DynamicText from "components/DynamicText";
import { Private } from "config/firebase/authRoute";
import JSConfetti from "js-confetti";
import { useRef } from "react";

const Home = () => {
  const dynamicTextRef = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicTextRef.current.changeValue(e.target.value);
    const jsConfetti = new JSConfetti();

    jsConfetti.addConfetti({
      emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
      confettiRadius: 6,
      confettiNumber: 3,
    });
  };

  return (
    <Flex minH={"93vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <title>Coding Test</title>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}></Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <DynamicText ref={dynamicTextRef} />
            <Input onChange={onChange} />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Private(Home);
