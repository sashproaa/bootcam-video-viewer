import React from 'react';
import cls from './style.module.css';

interface Props {
  className?: string;
  children: string;
  fill?: boolean;
  active?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

export default function ButtonLine({
  className = '',
  children,
  fill = false,
  active = false,
  onClick = () => {},
  ...props
}: Props) {
  return (
    <button
      className={`
      ${cls.button} ${fill ? cls.fill : ''}
      ${active ? cls.active : ''}
      ${className}`}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
