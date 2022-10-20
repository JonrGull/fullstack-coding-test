import { Center, Spinner } from "@chakra-ui/react";

export default function LoadingSpinner() {
  return (
    <Center h="100vh">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="green.300" size="xl" />
    </Center>
  );
}
