import React, { useEffect, useState } from 'react';
import cls from './style.module.css';

interface Props {
  className?: string;
  type?: string;
  placeholder?: string;
  fill?: boolean;
}

export default function Input({
  className = '',
  type = 'text',
  fill = true,
  ...props
}: Props) {
  return (
    <input
      className={`${cls.input} ${className} ${fill ? cls.fill : ''}`}
      type={type}
      {...props}
    />
  );
}
