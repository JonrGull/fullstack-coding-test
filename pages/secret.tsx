import { Text } from "@chakra-ui/react";
import { Private } from "config/firebase/authRoute";
import React from "react";

const secret = () => {
  return (
    <Text fontSize="sm" color="white">
      You found me!
    </Text>
  );
};

export default Private(secret);
