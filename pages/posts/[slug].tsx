import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Image,
  Link,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import BlogModal from "components/BlogModal";
import { db } from "config/firebase";
import { addDoc, collection, Firestore, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

type PostFormat = {
  id: string;
  title: string;
  content: string;
  img: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<PostFormat[]>([]);
  const [postData, setPostData] = useState({
    id: "",
    title: "",
    content: "",
    img: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectedPost = (post: React.SetStateAction<{ id: string; title: string; content: string; img: string }>) => {
    setPostData(post);
    onOpen();
  };

  const submitPost = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        id: (Math.floor(Math.random()) + 1).toString(),
        post: "Hello World",
        content: "This is my first post",
        img: "https://images.pexels.com/photos/3184647/pexels-photo-3184647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getPosts = async (db: Firestore) => {
    const postsCol = collection(db, "posts");
    const postsSnapshot = await getDocs(postsCol);
    const postArray = [];
    postsSnapshot.docs.forEach((doc) => {
      postArray.push({ ...doc.data(), id: doc.id });
    });
    setPosts(postArray);
  };

  useEffect(() => {
    getPosts(db);
  }, []);

  return (
    <Container maxW={"7xl"} p="12">
      <Button onClick={submitPost}>Submit test post</Button>
      {isOpen ? <BlogModal postData={postData} isOpen={isOpen} onClose={onClose} /> : null}
      <Heading as="h2" marginTop="5">
        Latest articles
      </Heading>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        {posts.map((post) => (
          <WrapItem
            onClick={() => selectedPost(post)}
            key={post.id}
            width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}>
            <Box w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                  <Image
                    transform="scale(1.0)"
                    src={post.img}
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: "scale(1.05)",
                    }}
                  />
                </Link>
              </Box>

              <Heading fontSize="xl" marginTop="2">
                <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                  {post.title}
                </Link>
              </Heading>

              <Text as="p" fontSize="md" marginTop="2">
                {post.content}
              </Text>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Container>
  );
}
