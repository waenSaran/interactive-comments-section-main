import type { ReactElement, ReactNode } from 'react';

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  icon: ReactElement | ReactNode;
};
function IconButton(props: ButtonProps) {
  const { icon, ...buttonProps } = props;
  return (
    <button className='p-1 cursor-pointer min-h-7 w-max' type='button' {...buttonProps}>
      {icon}
    </button>
  );
}

export default IconButton;
