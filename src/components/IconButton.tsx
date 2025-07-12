import type { ReactElement, ReactNode } from 'react';

type ButtonProps = {
  icon: ReactElement | ReactNode;
};
function IconButton(props: ButtonProps) {
  return (
    <button className='p-1 cursor-pointer min-h-7 w-max' type='button'>
      {props.icon}
    </button>
  );
}

export default IconButton;
