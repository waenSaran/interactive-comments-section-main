import { useState } from 'react';
import IconButton from './IconButton';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type VoteProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  score: number;
};
function Vote({ score, className, ...props }: VoteProps) {
  const [displayScore, setDisplayScore] = useState<number>(score);
  return (
    <div
      className={twMerge(
        clsx('bg-purple-secondary px-2 py-1 flex flex-col h-fit gap-1 rounded-md', className)
      )}
      {...props}
    >
      <IconButton
        onClick={() => setDisplayScore((prev) => prev + 1)}
        icon={<img src='/src/assets/images/icon-plus.svg' alt='Plus' width={12} height={12} />}
      />
      <p className='cursor-default text-purple-main font-bold text-center'>{displayScore ?? 0}</p>
      <IconButton
        onClick={() => setDisplayScore((prev) => prev - 1)}
        icon={<img src='/src/assets/images/icon-minus.svg' alt='Minus' width={12} height={12} />}
      />
    </div>
  );
}

export default Vote;
