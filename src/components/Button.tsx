import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  iconSrc?: string;
  buttonType: 'contain' | 'text';
};

function Button({
  className,
  iconSrc,
  children,
  buttonType = 'text',
  ...buttonProps
}: ButtonProps) {
  switch (buttonType) {
    case 'contain':
      return (
        <button
          className={twMerge(
            clsx(
              'flex items-center bg-purple-main px-5 py-2 rounded-md h-fit cursor-pointer hover:opacity-50',
              className
            )
          )}
          {...buttonProps}
        >
          {iconSrc && <img src={iconSrc} alt='Button icon' className='object-contain w-3' />}
          {children}
        </button>
      );
    default:
      return (
        <button
          className={twMerge(clsx('flex gap-2 cursor-pointer hover:opacity-50', className))}
          {...buttonProps}
        >
          {iconSrc && <img src={iconSrc} alt='Button icon' className='object-contain w-3' />}
          {children}
        </button>
      );
  }
}

export default Button;
