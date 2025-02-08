interface InputProps {
  label?: string;
  type: string;
  name: string;
  value?: string | number | undefined; // Removed Date, keeping it simple
  className?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Specific type
}

const Input = ({ label, type,name,placeholder, required, className,value, onChange,} : InputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-gray-700 font-medium ">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value?.toString()}
        className={`border p-2 rounded  focus:outline-none ${className}`}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;