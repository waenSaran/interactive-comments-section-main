type ColumnProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  gap?: number;
  children: React.ReactNode;
};
function Column({ gap = 2, children, className, ...props }: ColumnProps) {
  return (
    <div className={`flex flex-col gap-${gap} ` + className} {...props}>
      {children}
    </div>
  );
}

export default Column;
