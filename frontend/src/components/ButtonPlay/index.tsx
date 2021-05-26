import React from 'react';
import cls from './style.module.css';
import { IoPlaySharp } from 'react-icons/io5';

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
    <button className={cls.button}>
      <IoPlaySharp className={cls.icon} {...props} />
    </button>
  );
}
