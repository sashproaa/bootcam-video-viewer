import React from 'react';
import cls from './style.module.css';

interface Props {
  className?: string;
}

export default function Profile({ className = '' }: Props) {
  return <div className={className}></div>;
}
