import { Box, Center, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [router]);

  return (
    <Center bg="black" h={"100vh"} color="white">
      <Box>
        <Text fontSize="3xl">404 - Page Not Found</Text>
        <Text fontSize="xl">You will be redirect in 3 seconds.</Text>
      </Box>
    </Center>
  );
}
