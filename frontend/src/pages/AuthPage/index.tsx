import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isShowAuth, setIsShowAuth } from '../../store/userSlice';
import ModalWin from '../../components/ModalWin';
import AuthMain from './AuthMain';
import Recovery from './Recovery';
import cls from './style.module.css';

export default function AuthPage() {
  const dispatch = useDispatch();
  const isOpen = useSelector(isShowAuth);
  const [auth, setAuth] = useState(true);

  useEffect(() => {}, []);

  const closeModal = () => {
    dispatch(setIsShowAuth(false));
  };

  const handleExited = () => {
    setAuth(true);
  };

  const handleRecovery = () => {
    setAuth(!auth);
  };

  return (
    <ModalWin show={isOpen} onClose={closeModal} onExited={handleExited}>
      {auth ? <AuthMain onRecovery={handleRecovery} /> : <Recovery />}
    </ModalWin>
  );
}
