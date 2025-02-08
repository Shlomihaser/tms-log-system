interface TextareaProps {
  label?: string;
  name: string;
  value?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({ label, name, placeholder, required, className, value, onChange,}: TextareaProps) => {
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
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Textarea;