import React from 'react';
import { Modal } from 'react-bootstrap';
import { IoCloseOutline } from 'react-icons/io5';
import cls from './style.module.css';

interface Props {
  children: JSX.Element | JSX.Element[] | null;
  className?: string;
  show: boolean;
  onClose: () => void;
  onExited?: () => void;
}

export default function ModalWin({
  children,
  className = '',
  show,
  onClose,
  onExited = () => {},
}: Props) {
  return (
    <Modal
      dialogClassName={cls.modal}
      show={show}
      onHide={onClose}
      onExited={onExited}
    >
      <div className={cls.wrapper}>
        <div className={cls.close}>
          <button className={cls.buttonClose} type='button' onClick={onClose}>
            <IoCloseOutline className={cls.iconClose} />
          </button>
        </div>
        <div className={cls.main}>{children}</div>
      </div>
    </Modal>
  );
}
