import type { UserType } from './Profile';
import Profile from './Profile';
import Vote from './Vote';
import mockData from '../assets/data.json';
import Button from './Button';

export type PostType = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: UserType;
  replyingTo?: string;
  replies?: Array<PostType>;
};

export type PostProps = PostType & {
  onReply: () => void;
};

function ReplyButton({ onReply }: { onReply: () => void }) {
  return (
    <Button className='ml-auto' iconSrc='src/assets/images/icon-reply.svg' onClick={onReply}>
      <span className='font-semibold text-purple-main'>Reply</span>
    </Button>
  );
}

type AuthActionButtonsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

function AuthActionButtons({ onEdit, onDelete }: AuthActionButtonsProps) {
  return (
    <div className='ml-auto flex gap-5'>
      <Button iconSrc='src/assets/images/icon-delete.svg' onClick={onDelete}>
        <span className='font-semibold text-error-main'>Delete</span>
      </Button>
      <Button iconSrc='src/assets/images/icon-edit.svg' onClick={onEdit}>
        <span className='font-semibold text-purple-main'>Edit</span>
      </Button>
    </div>
  );
}

function Post({ replyingTo, content, createdAt, score, user, onReply }: PostProps) {
  const isCurrentUser = mockData.currentUser.username === user.username;
  const handleOnEdit = () => {

  }
  const handleOnDelete = () => {

  }
  return (
    <div className='bg-white rounded-md flex p-5 gap-5'>
      <Vote score={score} />
      <div className='flex flex-col gap-3 w-full'>
        <div className='header flex h-fit gap-5'>
          <Profile {...user} />
          <span className='text-gray-400'>{createdAt}</span>
          {isCurrentUser ? (
            <AuthActionButtons onEdit={handleOnEdit} onDelete={handleOnDelete}/>
          ) : (
            <ReplyButton onReply={onReply} />
          )}
        </div>
        <div className='content-block'>
          {replyingTo && <span className='font-bold text-purple-main'>@{replyingTo} </span>}
          <span className='content text-gray-500'>{content}</span>
        </div>
      </div>
    </div>
  );
}

export default Post;
