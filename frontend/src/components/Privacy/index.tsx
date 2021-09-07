import React from 'react';

import ModalWin from '../ModalWin';
import PrivacyText from '../PrivacyText';

import cls from './style.module.css';

interface Props {
  className?: string;
  show: boolean;
  onClose: () => void;
}

export default function Privacy({ className = '', show, onClose }: Props) {
  return (
    <ModalWin
      className={`${cls.modal}${className}`}
      full
      show={show}
      onClose={onClose}
    >
      <div className={cls.privacy}>
        <PrivacyText />
      </div>
    </ModalWin>
  );
}
