import IconButton from './IconButton';

type VoteProps = {
    score: number;
}
function Vote({ score }: VoteProps) {
  return (
    <div className='bg-purple-secondary px-2 py-1 flex flex-col h-fit gap-1 rounded-md'>
      <IconButton icon={<img src='/src/assets/images/icon-plus.svg' alt='Plus' width={12} height={12}/>} />
      <p className='cursor-default text-purple-main font-bold text-center'>{score ?? 0}</p>
      <IconButton icon={<img src='/src/assets/images/icon-minus.svg' alt='Minus' width={12} height={12}/>} />
    </div>
  );
}

export default Vote;
