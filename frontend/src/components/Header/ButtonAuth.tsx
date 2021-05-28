import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Routes } from '../../common/enums/RoutesEnum';
import cls from './style.module.css';
import { setIsShowAuth, userInfo } from '../../store/userSlice';
import Button from '../Button';
import ButtonClean from '../ButtonClean';
import { LogIn } from 'react-feather';
import { User } from 'react-feather';

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
            <img className={cls.userImg} src={user.avatar} alt={user.name} />
          ) : (
            <User size={45} />
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
