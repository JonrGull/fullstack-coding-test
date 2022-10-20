import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function BlogModal({ postData, isOpen, onClose }) {
  return (
    <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Image src={postData.img} alt="blog photo" />
        <ModalHeader>{postData.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{postData.content}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3}>
            Share
          </Button>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
