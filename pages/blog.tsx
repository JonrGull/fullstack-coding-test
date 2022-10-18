import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  ScaleFade,
  Spacer,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import BlogModal from "components/BlogModal";
import LoadingSpinner from "components/LoadingSpinner";
import WritePostModal from "components/WritePostModal";
import { db } from "config/firebase";
import { addDoc, collection, deleteDoc, doc, Firestore, onSnapshot } from "firebase/firestore";
import React, { SetStateAction, useEffect, useState } from "react";
import { PostFormat } from "types/posts";
import randomPosts from "utils/randomPosts.json";

export default function Blog() {
  const [posts, setPosts] = useState<PostFormat[]>([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState<PostFormat>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectedPost = (post: SetStateAction<PostFormat>) => {
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
      setLoading(false);
      setFadeIn(true);
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
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Container maxW={"7xl"} p={10}>
          <Flex>
            <Button colorScheme="green" onClick={submitPost}>
              Submit test post
            </Button>
            <Spacer />
            <WritePostModal />
          </Flex>

          {isOpen ? <BlogModal postData={postData} isOpen={isOpen} onClose={onClose} /> : null}

          <Heading as="h2" mt={5}>
            Latest articles
          </Heading>

          <Divider mt={5} />
          <Wrap spacing="30px">
            {posts.map((post) => (
              <WrapItem key={post.id} minH="sm" width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}>
                <ScaleFade initialScale={0.9} in={fadeIn}>
                  <Box position={"relative"} minH={"lg"} mt={5} ml={1} mb={1} w="100%" rounded="sm" shadow="md">
                    <Box onClick={() => selectedPost(post)} borderRadius="lg" overflow="hidden">
                      <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                        <Image
                          transform="scale(1.0)"
                          src={post.img}
                          alt="blog post image"
                          objectFit="contain"
                          width="100%"
                          transition="0.3s ease-in-out"
                          _hover={{
                            transform: "scale(1.05)",
                          }}
                        />
                      </Link>
                    </Box>

                    <Heading fontSize="xl" mt={2} pl={2}>
                      <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                        {post.title}
                      </Link>
                    </Heading>

                    <Text as="p" fontSize="md" mt={2} px={2} noOfLines={6}>
                      {post.content}
                    </Text>
                    <Button
                      position={"absolute"}
                      bottom={0}
                      left={0}
                      m={2}
                      colorScheme="red"
                      onClick={() => deletePost(post.id)}>
                      Delete
                    </Button>
                  </Box>
                </ScaleFade>
              </WrapItem>
            ))}
          </Wrap>
        </Container>
      )}
    </>
  );
}
