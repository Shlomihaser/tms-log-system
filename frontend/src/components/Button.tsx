import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className }) => {
    return (
        <button className={`px-4 py-2 rounded ${className}`}>
            {children}
        </button>
    );
};

export default Button;