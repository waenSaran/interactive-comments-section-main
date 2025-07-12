type ContainerProps = {
  children: React.ReactNode
};

function Container(props: ContainerProps) {
  return <div className='max-w-2xl mx-auto flex flex-col gap-4'>{props.children}</div>;
}

export default Container;
