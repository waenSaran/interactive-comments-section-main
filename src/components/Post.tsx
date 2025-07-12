import { useState } from 'react';
import type { UserType } from './Profile';
import Profile from './Profile';
import Vote from './Vote';

type PostProps = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: UserType;
};

function Post({ id, content, createdAt, score, user }: PostProps) {

  return (
    <div className='bg-white rounded-md flex p-5 gap-5'>
      <Vote score={score} />
      <div className='flex flex-col gap-3'>
        <div className='header flex h-fit gap-5'>
          <Profile {...user} />
          <span className='text-gray-400'>{createdAt}</span>
        </div>
        <div className='content text-gray-400'>{content}</div>
      </div>
    </div>
  );
}

export default Post;
