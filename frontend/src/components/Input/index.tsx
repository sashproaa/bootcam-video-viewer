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
}

export default function Input({
  className = '',
  type = 'text',
  fill = true,
  dark = false,
  ...props
}: Props) {
  const [inputType, setInputType] = useState(type);

  const handleToggleInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <label className={`${cls.label} ${fill ? cls.fill : ''}`}>
      <input
        className={`
      ${cls.input}
      ${className}
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
    </label>
  );
}
