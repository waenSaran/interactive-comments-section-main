import mockData from '../assets/data.json';
import { getAvatar } from '../utils/image-utils';
export type UserType = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

function Profile({ image, username }: UserType) {
  const currentUser = mockData.currentUser;
  return (
    <div className='flex gap-3 items-center'>
      <img src={getAvatar(image.png)} alt={`Profile-${username}`} height={28} width={28} />
      <span className='font-semibold'>{username}</span>
      {currentUser.username === username && (
        <span className='bg-purple-main text-white text-[10px] mt-1 flex w-fit h-fit px-2 pb-1 rounded-xs font-semibold'>
          you
        </span>
      )}
    </div>
  );
}

export default Profile;
