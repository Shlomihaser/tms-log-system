import { ChangeEvent } from 'react';

interface InputProps {
    label?: string;
    type?: 'text' | 'number' | 'date' | 'textarea';
    placeholder?: string;
    name?: string;
    value?: string | number | Date;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required?: boolean;
}


const Input: React.FC<InputProps> = ({
                                        label,
                                        type,
                                        placeholder,
                                        name,
                                        value,
                                        onChange,
                                        required,
                                    }) => {
    return (
        <div className="form-control">
            <label className="label label-xs text-gray-700">
              <span className="label-text-alt">{label}</span>
            </label>
            {type === 'textarea' ? (
                <textarea
                    className="textarea textarea-sm text-gray-800 focus:ring-2 focus:ring-gray-300 focus:outline-none rounded"
                    placeholder={placeholder}
                    name={name}
                    value={value as string}
                    onChange={onChange}
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    className="input input-sm text-gray-800 focus:ring-2 focus:ring-gray-300 focus:outline-none rounded"
                    name={name}
                    value={type === 'date' ? (value as Date).toISOString().split('T')[0]: value}
                    onChange={onChange}
                    required={required}
                />
            )}

        </div>
    );
};


export default Input;