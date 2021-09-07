import React from 'react';

import cls from './style.module.css';

interface Props {
  className?: string;
  children: JSX.Element | JSX.Element[] | null;
}

export default function Header({ className = '', children }: Props) {
  return <header className={`${cls.header} ${className}`}>{children}</header>;
}
