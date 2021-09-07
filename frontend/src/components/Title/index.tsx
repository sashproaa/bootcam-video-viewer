import React from 'react';

import cls from './style.module.css';

interface Props {
  className?: string;
  children: JSX.Element | JSX.Element[] | string | null;
  id?: string;
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

export default function Title({
  className = '',
  children,
  type = 'h1',
  ...props
}: Props) {
  const Tag = type;
  return (
    <Tag className={`${cls.title} ${cls[type]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
