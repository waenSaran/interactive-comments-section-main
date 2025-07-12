import type { UserType } from './Profile';
import Profile from './Profile';
import Vote from './Vote';
import mockData from '../assets/data.json';
import Button from './Button';
import { useState } from 'react';
import TextAreaInputField from './TextAreaInputField';
import Column from './Column';
import Modal from './Modal';

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
  onReply?: () => void;
  onUpdateComment?: (value: string) => void;
  onConfirmDelete?: (id: number) => void;
};

function ReplyButton({ onReply }: { onReply: () => void }) {
  return (
    <Button
      buttonType='text'
      className='ml-auto'
      iconSrc='src/assets/images/icon-reply.svg'
      onClick={onReply}
    >
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
      <Button buttonType='text' iconSrc='src/assets/images/icon-delete.svg' onClick={onDelete}>
        <span className='font-semibold text-error-main'>Delete</span>
      </Button>
      <Button buttonType='text' iconSrc='src/assets/images/icon-edit.svg' onClick={onEdit}>
        <span className='font-semibold text-purple-main'>Edit</span>
      </Button>
    </div>
  );
}

function Post({
  id,
  replyingTo,
  content: defaultContent,
  createdAt,
  score,
  user,
  onReply = () => {},
  onConfirmDelete = () => {},
}: PostProps) {
  const isCurrentUser = mockData.currentUser.username === user.username;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [content, setContent] = useState<string>(defaultContent);
  const handleOnEdit = () => {
    setIsEditing(true);
    const replyTo = replyingTo ? `@${replyingTo} ` : '';
    setContent(replyTo + content);
  };
  const handleOnUpdateComment = () => {
    setContent(content.replaceAll(`@${replyingTo} `, ''));
    setIsEditing(false);
  };
  const handleOnDelete = () => {
    setIsOpenModal(true);
  };

  const handleOnConfirmDelete = () => {
    onConfirmDelete(id);
    setIsOpenModal(false);
  };

  return (
    <div className='bg-white rounded-md flex p-5 gap-5'>
      <Vote score={score} />
      <div className='flex flex-col gap-3 w-full'>
        <div className='header flex h-fit gap-5'>
          <Profile {...user} />
          <span className='text-gray-400'>{createdAt}</span>
          {isCurrentUser ? (
            <AuthActionButtons onEdit={handleOnEdit} onDelete={handleOnDelete} />
          ) : (
            <ReplyButton onReply={onReply} />
          )}
        </div>
        {isEditing ? (
          <Column gap={3}>
            <TextAreaInputField
              name={`content-${id}`}
              value={content}
              rows={3}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
            />
            <Button className='ml-auto' onClick={handleOnUpdateComment} buttonType='contain'>
              <span className='text-white font-semibold text-xs'>UPDATE</span>
            </Button>
          </Column>
        ) : (
          <div className='content-block'>
            {replyingTo && <span className='font-bold text-purple-main'>@{replyingTo} </span>}
            <span className='content text-gray-500'>{content}</span>
          </div>
        )}
      </div>
      <Modal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        onConfirmDelete={handleOnConfirmDelete}
      />
    </div>
  );
}

export default Post;
