import React from 'react';
import { Check } from 'react-feather';

import cls from './style.module.css';

interface Props {
  label: string;
  checked: boolean;
  onChange: () => void;
  dark?: boolean;
}

export default function Checkbox({ label, checked, onChange, dark }: Props) {
  const handleChange = () => {
    onChange();
  };

  return (
    <label className={cls.label} htmlFor={cls.checkboxId}>
      <input
        className={cls.checkbox}
        type='checkbox'
        id={cls.checkboxId}
        checked={checked}
        onChange={handleChange}
      />
      <span
        className={`${cls.customCheckbox} ${checked ? cls.customChecked : ''}`}
      >
        <Check className={cls.icon} size={20} />
      </span>
      <p className={`${cls.text} ${dark ? cls.dark : ''}`}>&emsp;{label}</p>
    </label>
  );
}
