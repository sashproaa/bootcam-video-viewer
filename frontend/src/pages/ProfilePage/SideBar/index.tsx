import React, { useEffect } from 'react';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Image } from 'react-bootstrap';
import userImg from '../../../assets/user.png';
import { fetchLogoutUser, userInfo } from '../../../store/userSlice';
import cls from './style.module.css';
import Header from '../Header';
import { RoutesProfile } from '../RoutesProfileEnum';
import { LogOut } from 'react-feather';

export default function SideBar() {
  const dispatch = useDispatch();
  const user = useSelector(userInfo);

  const handleLogout = () => {
    dispatch(fetchLogoutUser());
  };

  return (
    <>
      <Header className={cls.userInfo}>
        <img
          className={cls.avatar}
          src={user.avatar || userImg}
          alt={user.first_name}
        />
        <ul>
          <li>
            <p className={cls.name}>{user.first_name}</p>
          </li>
          <li>
            <span className={cls.email}>{user.email}</span>
          </li>
        </ul>
      </Header>
      <menu className={cls.links}>
        <Link className={cls.link} to={RoutesProfile.profile}>
          Профиль
        </Link>
        <Link className={cls.link} to={RoutesProfile.subscription}>
          Подписки и платежи
        </Link>
        <Link className={cls.link} to={RoutesProfile.video}>
          Мои спектакли
        </Link>
        <button className={cls.link} onClick={handleLogout}>
          Выйти &emsp; <LogOut size={20} />
        </button>
      </menu>
    </>
  );
}
