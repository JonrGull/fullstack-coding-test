import { Text } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import React from "react";
import { Private } from "config/firebase/authRoute";

const secret = () => {
  return (
    <>
      <Navbar />
      <Text fontSize="sm" color="white">
        You found me!
      </Text>
    </>
  );
};

export default Private(secret);
