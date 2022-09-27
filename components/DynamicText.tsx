import { Text } from "@chakra-ui/react";
import { forwardRef, SetStateAction, useImperativeHandle, useState } from "react";

const DynamicText = forwardRef((_props, ref) => {
  const [value, setValue] = useState("Random Text");

  useImperativeHandle(ref, () => ({
    changeValue(text: SetStateAction<string>) {
      return setValue(text);
    },
  }));

  return <Text fontSize="5xl">{value}</Text>;
});

export default DynamicText;
