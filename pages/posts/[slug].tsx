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
import { addDoc, collection, deleteDoc, doc, Firestore, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import randomPosts from "utils/randomPosts.json";

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
      const randomPost = randomPosts["posts"][Math.floor(Math.random() * randomPosts["posts"].length)];
      await addDoc(collection(db, "posts"), {
        title: randomPost.title,
        content: randomPost.content,
        img: randomPost.img,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const realTimeGetPosts = async (db: Firestore) => {
    const postsCol = collection(db, "posts");
    onSnapshot(postsCol, (snapshot) => {
      const postArray = [];
      snapshot.docs.forEach((doc) => {
        postArray.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postArray);
    });
  };

  const deletePost = async (id: string) => {
    try {
      await deleteDoc(doc(db, "posts", id));
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };

  useEffect(() => {
    realTimeGetPosts(db);
  }, []);

  return (
    <Container maxW={"7xl"} p="12">
      <Button backgroundColor={"green.300"} color={"white"} onClick={submitPost}>
        Submit test post
      </Button>
      {isOpen ? <BlogModal postData={postData} isOpen={isOpen} onClose={onClose} /> : null}
      <Heading as="h2" marginTop="5">
        Latest articles
      </Heading>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        {posts.map((post) => (
          <WrapItem key={post.id} width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}>
            <Box w="100%">
              <Box onClick={() => selectedPost(post)} borderRadius="lg" overflow="hidden">
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
              <Button backgroundColor={"red.300"} color={"white"} onClick={() => deletePost(post.id)}>
                Delete
              </Button>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Container>
  );
}
