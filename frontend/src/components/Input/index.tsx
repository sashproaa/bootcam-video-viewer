import React, { useState } from 'react';
import cls from './style.module.css';
import { Eye, EyeOff } from 'react-feather';

interface Props {
  className?: string;
  type?: string;
  placeholder?: string;
  fill?: boolean;
  dark?: boolean;
  id?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: any) => void;
  min?: string;
  max?: string;
  errorText?: string;
}

export default function Input({
  className = '',
  type = 'text',
  fill = true,
  dark = false,
  errorText = '',
  ...props
}: Props) {
  const [inputType, setInputType] = useState(type);

  const handleToggleInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <label className={`${cls.label} ${fill ? cls.fill : ''} ${className}`}>
      <input
        className={`
      ${cls.input}
      ${fill ? cls.fill : ''}
      ${dark ? cls.dark : ''}`}
        type={inputType}
        {...props}
      />
      {type === 'password' &&
        (inputType === 'password' ? (
          <Eye className={cls.icon} size={20} onClick={handleToggleInputType} />
        ) : (
          <EyeOff
            className={cls.icon}
            size={20}
            onClick={handleToggleInputType}
          />
        ))}
      <p className={cls.error}>{errorText}</p>
    </label>
  );
}
