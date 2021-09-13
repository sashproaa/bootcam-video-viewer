import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogIn, User } from 'react-feather';

import { Routes } from '../../common/enums/RoutesEnum';
import { setIsShowAuth, userInfo } from '../../store/userSlice';
import ButtonClean from '../ButtonClean';

import cls from './style.module.css';

export default function ButtonAuth() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(userInfo);

  useEffect(() => {}, []);

  const handleAuth = () => {
    dispatch(setIsShowAuth(true));
  };

  const handleClickUser = () => {
    history.push(Routes.profile);
  };

  return (
    <>
      {user.email ? (
        <button className={cls.btnUser} onClick={handleClickUser}>
          {user.avatar ? (
            <img
              className={cls.userImg}
              src={user.avatar}
              alt={user.first_name}
            />
          ) : (
            <User size={32} />
          )}
        </button>
      ) : (
        <ButtonClean
          className={cls.auth}
          size='small'
          style='uppercase'
          onClick={handleAuth}
        >
          <span className={cls.subscribeText}>Войти</span>
          <LogIn className={cls.authIcon} size={24} />
        </ButtonClean>
      )}
    </>
  );
}
