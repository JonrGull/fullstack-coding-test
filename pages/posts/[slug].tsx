import React from "react";

import { db } from "config/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Blog() {
  
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



  return (
    <div>
      <h1>Blog</h1>
    </div>
  );
}
