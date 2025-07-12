export type UserType = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

function Profile({ image, username }: UserType) {
  return (
    <div className='flex gap-3'>
      <img src={'/src/assets' + image.png} alt={`Profile-${username}`} height={28} width={28}/>
      <span className="font-semibold">{username}</span>
    </div>
  );
}

export default Profile;
