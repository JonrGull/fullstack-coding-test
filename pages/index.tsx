import { Box, Flex, Input, Stack, useColorModeValue } from '@chakra-ui/react';
import DynamicText from 'components/DynamicText';
import { useRef } from 'react';
import Confetti from 'react-confetti';
import { useStartTyping } from 'react-use';
import useWindowSize from 'react-use/lib/useWindowSize';

const Home = () => {
  const dynamicTextRef = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicTextRef.current.changeValue(e.target.value);
  };

  const { width, height } = useWindowSize();

  useStartTyping(() => {
    dynamicTextRef.current.startConfetti();
  });

  return (
    <Flex minH={"80vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <title>Coding Test</title>
      <Confetti width={width} height={height} />
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

export default Home;
