import React from 'react';
import { Feather } from 'react-feather';
import ButtonClean from '../ButtonClean';
import { clearToken } from '../../common/helpers/tokenHelper';
import { clearHash } from '../../common/helpers/hashHelper';
import cls from './style.module.css';

export default function ClearButton() {
  const handleClear = () => {
    clearToken();
    // clearHash();
  };

  return (
    <ButtonClean className={cls.button} onClick={handleClear}>
      <Feather className={cls.icon} size={32} />
    </ButtonClean>
  );
}
