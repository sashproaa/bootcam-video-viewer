import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isShowAuth, setIsShowAuth } from '../../store/userSlice';
import ModalWin from '../../components/ModalWin';
import AuthMain from './AuthMain';
import Recovery from './Recovery';
import cls from './style.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { Routes } from '../../common/enums/RoutesEnum';

export default function AuthPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isOpen = useSelector(isShowAuth);
  const [auth, setAuth] = useState(true);

  useEffect(() => {}, []);

  const closeModal = () => {
    dispatch(setIsShowAuth(false));
    if (location.pathname === Routes.payment) history.goBack();
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
