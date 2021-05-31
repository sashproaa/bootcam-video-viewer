import React from 'react';
import cls from './style.module.css';
import { Play } from 'react-feather';

interface Props {
  className?: string;
  onClick?: () => void;
}

export default function ButtonPlay({
  className = '',
  onClick = () => {},
  ...props
}: Props) {
  return (
    <button className={`${cls.button} ${className}`}>
      <Play className={cls.icon} {...props} />
    </button>
  );
}
