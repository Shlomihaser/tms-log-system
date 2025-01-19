// Input.tsx
import React from 'react';

interface InputProps {
  label?: string;
  type: string;
  name: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, type, placeholder, name, required, className }) => {
    
    if (type === "textarea"){
      return(
        <div className="flex flex-col">
          <label htmlFor={name} className="text-gray-700 font-medium mb-1">{label}</label>
          <textarea
            id={name}
            name={name}
              className={`border p-2 rounded focus:ring-2 focus:ring-blue-200 focus:outline-none ${className}`}
                placeholder={placeholder}
                required={required}
              />

        </div>
      )
    }


  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-gray-700 font-medium mb-1">{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        className={`border p-2 rounded focus:ring-2 focus:ring-blue-200 focus:outline-none ${className}`}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;