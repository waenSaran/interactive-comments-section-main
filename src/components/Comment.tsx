import { useState, type FormEvent } from 'react';
import type { UserType } from './Profile';

type CommentProps = UserType & {
  type?: 'reply' | 'comment';
  onComment: (value: string) => void;
};
function Comment({ image, type='comment', onComment }: CommentProps) {
    const [comment,setComment] = useState<string>('');
  const handleSubmit = () => {
    onComment(comment);
    setComment('')
  };
  return (
    <div className='bg-white rounded-md flex p-5 gap-5'>
      <img
        className='h-fit'
        src={`../../src/assets${image.png}`}
        alt='My profile'
        height={32}
        width={32}
      />
        <textarea
          className='border border-gray-100 rounded-md w-full py-2 px-4 focus:outline-purple-main focus:outline-1'
          placeholder='Add a comment...'
          rows={3}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button
          className='flex items-center bg-purple-main px-5 py-2 rounded-md h-fit cursor-pointer hover:bg-indigo-400'
          onClick={handleSubmit}
        >
          <span className='text-white font-semibold text-xs'>{type === 'reply' ? 'REPLY' : 'SEND'}</span>
        </button>
    </div>
  );
}

export default Comment;
