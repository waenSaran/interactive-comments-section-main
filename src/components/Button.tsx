type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  iconSrc?: string;
};

function Button({ className, iconSrc, children, ...buttonProps }: ButtonProps) {
  return (
    <button className={'flex gap-2 cursor-pointer hover:opacity-50 ' + className} {...buttonProps}>
      {iconSrc && <img src={iconSrc} alt='Button icon' className='object-contain w-3' />}
      {children}
    </button>
  );
}

export default Button;
