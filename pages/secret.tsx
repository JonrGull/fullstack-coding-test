import { Button, Center, Text } from "@chakra-ui/react";
import { Private } from "config/firebase/authRoute";
import { useAuth } from "context/AuthContext";
import { useState } from "react";
import styles from "styles/secret.module.css";

const Secret = () => {
  const { user } = useAuth();
  const [reveal, setReveal] = useState(false);

  const handleShowText = () => {
    setReveal((curr) => !curr);
  };

  return (
    <>
      <title>Secret</title>
      <Button onClick={handleShowText} size="xs" rounded="5px" colorScheme="blackAlpha" variant="ghost">
        SECRET
      </Button>
      <Center mt={100}>
        <Text ml={1} fontSize="5xl" color={"white"}>
          {reveal && <span className={styles.secret}>{user.email} is really awesome.</span>}
        </Text>
      </Center>
    </>
  );
};

export default Private(Secret);
