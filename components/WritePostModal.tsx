import {
  Button,
  Center,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { db } from "config/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import images from "utils/randomImg.json";

import ErrorMessage from "./ErrorMessage";

export default function WritePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleWritePost = async () => {
    const titleVal = titleRef.current.value;
    const contentVal = contentRef.current.value;
    const imgVal = images["images"][Math.floor(Math.random() * images["images"].length)];

    if (titleVal === "" || contentVal === "") {
      setError("Please fill out all fields");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "posts"), {
        title: titleVal,
        content: contentVal,
        img: imgVal,
      });
      onClose();
      setLoading(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setError(null);
    }
  }, [isOpen]);

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Write article
      </Button>
      <Modal size="2xl" closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={10}>
          {error && <ErrorMessage message={error} />}
          <Input mb={10} ref={titleRef} placeholder="Title" />
          <Textarea ref={contentRef} placeholder="Content" />
          <ModalCloseButton />
          <ModalFooter>
            <Center>
              <Text mr={100}>A photo will be chosen for you.</Text>
            </Center>
            <Button onClick={handleWritePost} isLoading={loading} colorScheme="blue" mr={3}>
              Post!
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
