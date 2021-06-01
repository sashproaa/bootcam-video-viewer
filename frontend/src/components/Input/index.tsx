import React, { useEffect, useState } from 'react';
import cls from './style.module.css';

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
  return (
    <input
      className={`
      ${cls.input}
      ${className}
      ${fill ? cls.fill : ''}
      ${dark ? cls.dark : ''}`}
      type={type}
      {...props}
    />
  );
}
