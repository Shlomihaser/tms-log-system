import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

const Input: React.FC<InputProps> = ({ ...props }) => {
    return (
        <input
            {...props}
            className="px-3 py-2 bg-white text-gray-800 focus:ring-2 focus:ring-gray-300 focus:outline-none rounded border border-gray-300"
        />
    );
};

export default Input;