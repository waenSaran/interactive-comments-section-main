import './App.css';
import Container from './components/Container';
import Post from './components/Post';
import mockData from './assets/data.json';
import Comment from './components/Comment';
import { useState } from 'react';
import Column from './components/Column';

function App() {
  const [posts, setPosts] = useState(mockData.comments);
  const currentUser = mockData.currentUser;

  const handleOnComment = (val: string) => {
    const now = new Date().toLocaleString();
    const [date, time] = now.split(',');
    const [m, d, y] = date.split('/');
    const formattedDate = `${d}/${m}/${y}, ${time}`;
    const newPost = {
      id: posts.length + 1,
      content: val,
      createdAt: formattedDate,
      score: 0,
      user: currentUser,
      replies: [],
    };
    setPosts((prev) => prev.concat(newPost));
  };
  return (
    <>
      <Container>
        {posts.map((post) => {
          return (
            <Column key={`thread-${post.id}`} gap={5}>
              <Post key={`post-${post.id}`} {...post} />
              {post.replies.length > 0 && (
                <Column key={`reply-container-${post.id}`} className='reply border-l-1 border-gray-200 ml-8 pl-8' gap={5}>
                  {post.replies.map((item) => (
                    <Post key={`reply-${post.id}-${item.id}`} {...item} />
                  ))}
                </Column>
              )}
            </Column>
          );
        })}
        <Comment {...currentUser} onComment={handleOnComment} />
      </Container>
    </>
  );
}

export default App;
