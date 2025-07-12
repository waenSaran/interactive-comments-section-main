import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type TextAreaInputFieldProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {};
function TextAreaInputField({ className, ...props }: TextAreaInputFieldProps) {
  return (
    <textarea
      className={twMerge(
        clsx(
          'border border-gray-100 rounded-md w-full py-2 px-4 focus:outline-purple-main focus:outline-1',
          className
        )
      )}
      rows={3}
      {...props}
    />
  );
}

export default TextAreaInputField;
