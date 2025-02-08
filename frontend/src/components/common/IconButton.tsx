interface IconButtonProps {
  onClick?: () => void;
  icon: React.ReactNode;
  text: string;
  className?: string;
}

const IconButton= ({ onClick, icon,text, className,}: IconButtonProps) => {
  return (
    <button onClick={onClick} className={`rounded-md text-nowrap flex items-center  ${className}`}>
      {icon}
      <span className="hidden md:inline-block">{text}</span>
    </button>
  );
};
export default IconButton;
