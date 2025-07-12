import { useState } from 'react';
import Column from './Column';
import type { PostType } from './Post';
import mockData from '../assets/data.json';
import { formattedDate } from '../utils/date-utils';
import Post from './Post';
import Comment from './Comment';

type PostsProps = {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
};

function Posts({ posts, setPosts }: PostsProps) {
  const [showReplyBox, setShowReplyBox] = useState<number>(0);
  const currentUser = mockData.currentUser;

  const handleOnReply = (id: number) => {
    setShowReplyBox(id);
  };

  const handleSubmitReply = (id: number, value: string, replyTo: string) => {
    const now = new Date();
    const newComment = {
      id: Date.now(),
      content: value.replaceAll(`@${replyTo}`, ''),
      createdAt: formattedDate(now),
      score: 0,
      user: currentUser,
      replyingTo: replyTo,
    };
    const modifiedPost = posts.map((p) => {
      if (p.id === id) p.replies?.push(newComment);
      return p;
    });
    setPosts(modifiedPost);
    setShowReplyBox(0);
  };

  const handleOnConfirmDelete = (id: number) => {
    const modifiedPosts: PostType[] = posts
      .map((p): PostType | null => {
        // If it's a top-level comment to be deleted, return null
        if (p.id === id) return null;

        // If the comment to be deleted is a reply
        if (Array.isArray(p.replies)) {
          const newReplies = p.replies.filter((r) => r.id !== id);
          return { ...p, replies: newReplies };
        }

        return p;
      })
      .filter((p): p is PostType => p !== null); // <- type guard

    setPosts(modifiedPosts);
  };

  return posts.map((post) => {
    return (
      <Column key={`thread-${post.id}`} gap={5}>
        <Post
          key={`post-${post.id}`}
          {...post}
          onReply={() => handleOnReply(post.id)}
          onConfirmDelete={handleOnConfirmDelete}
        />
        {post.replies && post.replies.length > 0 && (
          <Column
            key={`reply-container-${post.id}`}
            className='reply border-l-1 border-gray-200 ml-8 pl-8'
            gap={5}
          >
            {post.replies.map((item) => (
              <Column gap={2} key={`reply-${post.id}-${item.id}`}>
                <Post
                  {...item}
                  onReply={() => handleOnReply(item.id)}
                  onConfirmDelete={handleOnConfirmDelete}
                />
                {showReplyBox === item.id && (
                  <Comment
                    replyTo={item.user.username}
                    type='reply'
                    onComment={(value) => handleSubmitReply(post.id, value, item.user.username)}
                    {...currentUser}
                  />
                )}
              </Column>
            ))}
          </Column>
        )}
        {showReplyBox === post.id && (
          <Comment
            className='mt-[-14px]'
            replyTo={post.user.username}
            type='reply'
            onComment={(value) => handleSubmitReply(post.id, value, post.user.username)}
            {...currentUser}
          />
        )}
      </Column>
    );
  });
}

export default Posts;
