import React from 'react';
import cls from './style.module.css';

interface Props {
  className?: string;
  children: string | string[] | JSX.Element | JSX.Element[];
  fill?: boolean;
  size?: 'small' | 'base' | 'big';
  active?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

export default function ButtonLine({
  className = '',
  children,
  fill = false,
  size = 'base',
  active = false,
  onClick = () => {},
  ...props
}: Props) {
  return (
    <button
      className={`
      ${cls.button} ${fill ? cls.fill : ''}
      ${active ? cls.active : ''}
      ${cls[size]}
      ${className}`}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
