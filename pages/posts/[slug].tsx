import { Box, Container, Divider, Heading, Image, Link, Text, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react";
import BlogModal from "components/BlogModal";
import { db } from "config/firebase";
import { addDoc, collection, Firestore, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface BlogAuthorProps {
  date: Date;
  name: string;
}

// export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
//   return (
//     <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
//       <Image
//         borderRadius="full"
//         boxSize="40px"
//         src="https://100k-faces.glitch.me/random-image"
//         alt={`Avatar of ${props.name}`}
//       />
//       <Text fontWeight="medium">{props.name}</Text>
//       <Text>—</Text>
//       <Text>{props.date.toLocaleDateString()}</Text>
//     </HStack>
//   );
// };

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    img: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectedPost = (post: React.SetStateAction<{ title: string; content: string; img: string }>) => {
    setPostData(post);
    onOpen();
  };

  const submitPost = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        post: "Hello World",
        content: "This is my first post",
        img: "https://picsum.photos/200",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getPosts = async (db: Firestore) => {
    const postsCol = collection(db, "posts");
    const postsSnapshot = await getDocs(postsCol);
    const postList = postsSnapshot.docs.map((doc) => doc.data());
    setPosts(postList);
    return postList;
  };

  //! used for real time?
  // const getPostsSnapshot = async () => {
  //   const querySnapshot = await getDocs(collection(db, "posts"));
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc}`);
  //   });
  // };

  useEffect(() => {
    getPosts(db);
  }, []);

  return (
    <Container maxW={"7xl"} p="12">
      {isOpen ? <BlogModal postData={postData} isOpen={isOpen} onClose={onClose} /> : null}
      <Heading as="h2" marginTop="5">
        Latest articles
      </Heading>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        {posts.map((post, index) => (
          <WrapItem
            onClick={() => selectedPost(post)}
            key={index}
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

              {/* <BlogAuthor name="John Doe" date={new Date("2021-04-06T19:01:27Z")} /> */}
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Container>
  );
}
