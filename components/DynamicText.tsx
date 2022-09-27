import { Box, Container, Text } from "@chakra-ui/react";
import { forwardRef, SetStateAction, useImperativeHandle, useState } from "react";

const DynamicText = forwardRef((_props, ref) => {
  const [value, setValue] = useState("Random Text");

  useImperativeHandle(ref, () => ({
    changeValue(text: SetStateAction<string>) {
      return setValue(text);
    },
  }));

  return (
    <Container maxW="md">
      <Box mb={5} shadow="md" borderWidth="1px">
        <Text p={2} minH={10}>
          {value}
        </Text>
      </Box>
    </Container>
  );
});

DynamicText.displayName = "DynamicText";

export default DynamicText;
