import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  fetchLoginUser,
  fetchRegistrationUser,
  LoginData,
  RegistrationData,
} from '../../../store/userSlice';
import Login from '../Login';
import Registration from '../Registration';

import cls from './style.module.css';

interface Props {
  onRecovery: () => void;
}

export default function AuthMain({ onRecovery }: Props) {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {}, []);

  const handleToggleType = (ev: any) => {
    ev.preventDefault();
    setIsLogin(!isLogin);
  };

  const handleRegistration = (data: RegistrationData) => {
    dispatch(fetchRegistrationUser(data));
  };

  const handleLogin = (data: LoginData) => {
    dispatch(fetchLoginUser(data));
  };

  return (
    <>
      <div className={cls.header}>
        <span className={cls.title}>{isLogin ? 'Вход' : 'Регистрация'}</span>
        <a href='#' className={cls.type} onClick={handleToggleType}>
          {isLogin ? 'Регистрация' : 'Вход'}
        </a>
      </div>
      <div className={cls.inform}>
        {isLogin ? (
          <Login onLogin={handleLogin} onRecovery={onRecovery} />
        ) : (
          <Registration onRegistration={handleRegistration} />
        )}
      </div>
    </>
  );
}
