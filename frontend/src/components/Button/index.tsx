import React from 'react';
import cls from './style.module.css';

interface Props {
  className?: string;
  children: string | string[] | JSX.Element | JSX.Element[];
  fill?: boolean;
  size?: 'small' | 'base' | 'big';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export default function Button({
  className = '',
  children,
  fill = false,
  size = 'base',
  onClick = () => {},
  ...props
}: Props) {
  return (
    <button
      className={`${cls.button} ${fill ? cls.fill : ''} ${
        cls[size]
      } ${className}`}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
