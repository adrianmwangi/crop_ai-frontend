import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

export default function Result() {
  const [posts, setPosts] = useState([]);

  //function to query firestore upload db
  useEffect(() => {
    const collectionRef = collection(db, "upload");
    const quer = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(quer, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp.toDate(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <div>
            <span>{post.caption}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
