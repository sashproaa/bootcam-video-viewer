import React from 'react';
import cls from './style.module.css';

interface Props {
  className?: string;
}

export default function Video({ className = '' }: Props) {
  return <div className={className}></div>;
}
