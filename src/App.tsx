import "./App.css";
import Container from "./components/Container";
import { type PostType } from "./components/Post";
import mockData from "./assets/data.json";
import Comment from "./components/Comment";
import { useEffect, useState } from "react";
import Posts from "./components/Posts";

function App() {
  const localStoragePosts = JSON.parse(localStorage.getItem("posts") || "[]");
  const [posts, setPosts] = useState<PostType[]>(
    localStoragePosts.length > 0 ? localStoragePosts : mockData.comments
  );
  const currentUser = mockData.currentUser;

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
    // eslint-disable-next-line
  }, [JSON.stringify(posts)]);

  const handleOnComment = (val: string) => {
    const now = new Date();
    const newPost = {
      id: Date.now(),
      content: val,
      createdAt: now.toISOString(),
      score: 0,
      user: currentUser,
      replies: [],
    };
    setPosts((prev) => prev.concat(newPost));
    localStorage.setItem("posts", JSON.stringify(localStoragePosts.concat(newPost)));
  };

  return (
    <>
      <Container>
        <Posts posts={posts} setPosts={setPosts} />
        <Comment {...currentUser} onComment={handleOnComment} />
      </Container>
    </>
  );
}

export default App;
