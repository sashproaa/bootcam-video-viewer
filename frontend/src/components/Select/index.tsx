import React from 'react';
import cls from './style.module.css';

interface Props {
  className?: string;
  children: JSX.Element | JSX.Element[] | null;
  placeholder?: string;
  fill?: boolean;
  dark?: boolean;
  id?: string;
  defaultValue?: string;
  name: string;
}

export default function Select({
  className = '',
  children,
  fill = true,
  dark = false,
  ...props
}: Props) {
  return (
    <select
      className={`
      ${cls.select}
      ${className}
      ${fill ? cls.fill : ''}
      ${dark ? cls.dark : ''}`}
      {...props}
    >
      {children}
    </select>
  );
}
