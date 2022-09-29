import React, { useEffect, useState } from "react";

import { Text } from "@chakra-ui/react";
import { db } from "config/firebase";
import { addDoc, collection, Firestore, getDocs } from "firebase/firestore";
import Image from "next/image";

export default function Blog() {
  const [posts, setPosts] = useState([]);

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
    <div>
      <button onClick={submitPost}>Submit Post</button>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <Text>{post.title}</Text>
          <Text>{post.content}</Text>
          <Image src={post.img} alt="post" width={50} height={50} />
        </div>
      ))}
    </div>
  );
}
