import './App.css';
import Container from './components/Container';
import { type PostType } from './components/Post';
import mockData from './assets/data.json';
import Comment from './components/Comment';
import { useState } from 'react';
import { formattedDate } from './utils/date-utils';
import Posts from './components/Posts';

function App() {
  const [posts, setPosts] = useState<PostType[]>(mockData.comments);
  const currentUser = mockData.currentUser;

  const handleOnComment = (val: string) => {
    const now = new Date();
    const newPost = {
      id: Date.now(),
      content: val,
      createdAt: formattedDate(now),
      score: 0,
      user: currentUser,
      replies: [],
    };
    setPosts((prev) => prev.concat(newPost));
  };

  return (
    <>
      <Container>
        <Posts posts={posts} setPosts={setPosts}/>
        <Comment {...currentUser} onComment={handleOnComment} />
      </Container>
    </>
  );
}

export default App;
