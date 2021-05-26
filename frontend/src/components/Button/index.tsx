import React from 'react';
import cls from './style.module.css';

interface Props {
  className?: string;
  children: string;
  fill?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export default function Button({
  className = '',
  children,
  fill = false,
  onClick = () => {},
  ...props
}: Props) {
  return (
    <button
      className={`${cls.button} ${fill ? cls.fill : ''} ${className}`}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
