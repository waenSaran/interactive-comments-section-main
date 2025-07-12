import { useState } from 'react';
import type { UserType } from './Profile';
import TextAreaInputField from './TextAreaInputField';

type CommentProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  UserType & {
    type?: 'reply' | 'comment';
    replyTo?: string;
    onComment: (value: string) => void;
  };
function Comment({
  image,
  type = 'comment',
  replyTo = '',
  onComment,
  className,
  ...wrapperProps
}: CommentProps) {
  const replyingTo = replyTo ? `@${replyTo} ` : '';
  const [comment, setComment] = useState<string>(replyingTo + '');
  const handleSubmit = () => {
    onComment(comment);
    setComment('');
  };
  return (
    <div className={`bg-white rounded-md flex p-5 gap-5 ` + className} {...wrapperProps}>
      <img
        className='h-fit'
        src={`/src/assets${image.png}`}
        alt='My profile'
        height={32}
        width={32}
      />
      <TextAreaInputField
        placeholder='Add a comment...'
        rows={3}
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <button
        className='flex items-center bg-purple-main px-5 py-2 rounded-md h-fit cursor-pointer hover:opacity-50'
        onClick={handleSubmit}
      >
        <span className='text-white font-semibold text-xs'>
          {type === 'reply' ? 'REPLY' : 'SEND'}
        </span>
      </button>
    </div>
  );
}

export default Comment;
