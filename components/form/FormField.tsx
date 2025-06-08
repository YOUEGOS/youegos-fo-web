import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder,
  rows
}) => {
  const isTextarea = type === 'textarea';
  const InputComponent = isTextarea ? 'textarea' as const : 'input' as const;

  return (
    <div className="relative">
      <label 
        htmlFor={name}
        className="block font-sans text-sm text-text-secondary mb-2"
      >
        {label}
      </label>
      <InputComponent
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full
          bg-background/50
          border border-accent/10
          rounded-sm
          px-4 py-3
          text-text-primary
          placeholder:text-text-secondary/50
          focus:outline-none
          focus:ring-1
          focus:ring-accent/30
          focus:border-accent/30
          transition-colors
          duration-200
          backdrop-blur-sm
          ${isTextarea ? 'min-h-[120px] resize-none' : ''}
        `}
      />
    </div>
  );
};
