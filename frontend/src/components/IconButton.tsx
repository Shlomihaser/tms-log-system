import React from "react";

interface IconButtonProps {
  onClick?: () => void;
  icon: React.ReactNode;
  text: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  text,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-white rounded-md text-nowrap flex items-center gap-2 ${className}`}
    >
      {icon}
      <span className="hidden md:inline-block">{text}</span>
    </button>
  );
};
export default IconButton;
