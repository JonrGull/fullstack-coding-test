import {
  Button,
  Center,
  Input,
  Modal,
  ModalBody,
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
import React, { useRef } from "react";
import images from "utils/randomImg.json";

export default function WritePost() {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleWritePost = async () => {
    const titleVal = titleRef.current.value;
    const contentVal = contentRef.current.value;
    const imgVal = images["images"][Math.floor(Math.random() * images["images"].length)];

    if (titleVal === "" || contentVal === "") return;

    try {
      await addDoc(collection(db, "posts"), {
        title: titleVal,
        content: contentVal,
        img: imgVal,
      });
      onClose();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Write article
      </Button>
      <Modal size="2xl" closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={10}>
          <Input isRequired mb={10} ref={titleRef} placeholder="Title" />
          <Textarea isRequired ref={contentRef} placeholder="Content" />
          <ModalCloseButton />
          <ModalBody pb={6}></ModalBody>
          <ModalFooter>
            <Center>
              <Text mr={100}>A photo will be chosen for you.</Text>
            </Center>
            <Button onClick={handleWritePost} colorScheme="blue" mr={3}>
              Post!
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
