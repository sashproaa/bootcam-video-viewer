import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut } from 'react-feather';

import {
  fetchLogoutUser,
  fetchUpdateAvatar,
  userInfo,
} from '../../../store/userSlice';
import Header from '../Header';
import { RoutesProfile } from '../RoutesProfileEnum';
import { SettingsContext } from '../../../components/App/App';

import userImg from '../../../assets/user.png';

import cls from './style.module.css';

export default function SideBar() {
  const dispatch = useDispatch();
  const user = useSelector(userInfo);
  const settings = useContext(SettingsContext);

  const handleLogout = () => {
    dispatch(fetchLogoutUser());
  };

  const handleChangeAvatar = ({ target }: any) => {
    const file = target.files[0];
    if (file) {
      dispatch(fetchUpdateAvatar(file));
    }
  };

  return (
    <>
      <Header className={cls.userInfo}>
        <div className={cls.avatarWrap}>
          <img
            className={cls.avatar}
            src={user.avatar || userImg}
            alt={user.first_name}
          />
          {/*<label className={cls.labelAvatar} htmlFor='inputAvatar'>*/}
          {/*  <Edit size={20} />*/}
          {/*</label>*/}
          {/*<input*/}
          {/*  className={cls.inputAvatar}*/}
          {/*  type='file'*/}
          {/*  id='inputAvatar'*/}
          {/*  name='avatar'*/}
          {/*  accept='image/*'*/}
          {/*  onChange={handleChangeAvatar}*/}
          {/*/>*/}
        </div>
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
          {settings.showSubscription ? 'Подписки и платежи' : 'Платежи'}
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
