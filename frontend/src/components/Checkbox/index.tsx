import React from 'react';
import { IoCheckmark } from 'react-icons/io5';
import cls from './style.module.css';

interface Props {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export default function Checkbox({ label, checked, onChange }: Props) {
  const handleChange = () => {
    onChange();
  };

  return (
    <label className={cls.label} htmlFor='remember'>
      <p className={cls.text}>{label}</p>
      <input
        className={cls.checkbox}
        type='checkbox'
        id='remember'
        checked={checked}
        onChange={handleChange}
      />
      <span
        className={`${cls.customCheckbox} ${checked ? cls.customChecked : ''}`}
      >
        <IoCheckmark className={cls.icon} />
      </span>
    </label>
  );
}
