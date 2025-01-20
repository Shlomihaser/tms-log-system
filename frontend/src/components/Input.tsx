interface InputProps {
  label?: string;
  type: string;
  name: string;
  value?: string | Date | number | undefined;
  className?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  name,
  required,
  className,
  value,
  onChange
}) => {
  if (type === "textarea") {
    return (
      <div className="flex flex-col">
        <label htmlFor={name} className="text-gray-700 font-medium mb-1">
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          className={`border p-2 rounded focus:ring-2 focus:ring-blue-200 focus:outline-none ${className}`}
          placeholder={placeholder}
          required={required}
          value={value?.toString()}
           onChange={onChange}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-gray-700 font-medium mb-1">
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