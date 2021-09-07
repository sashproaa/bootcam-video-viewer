import React from 'react';

import cls from './style.module.css';

interface Props {
  className?: string;
  children: string | string[] | JSX.Element | JSX.Element[];
  fill?: boolean;
  size?: 'small' | 'base' | 'big';
  style?: 'normal' | 'uppercase' | 'icon';
  onClick?: (e: any) => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

export default function ButtonClean({
  className = '',
  children,
  fill = false,
  size = 'base',
  style = 'normal',
  onClick = () => {},
  ...props
}: Props) {
  return (
    <button
      className={`
      ${cls.button} ${fill ? cls.fill : ''}
      ${style === 'uppercase' ? cls.uppercase : ''}
      ${cls[size]}
      ${className}`}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
