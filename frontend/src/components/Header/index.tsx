import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Routes } from '../../common/enums/RoutesEnum';
import cls from './style.module.css';
import { setIsShowAuth, userInfo } from '../../store/userSlice';
import Button from '../Button';
import ButtonClean from '../ButtonClean';
import { Search } from 'react-feather';
import { X } from 'react-feather';
import { Cast } from 'react-feather';
import { LogIn } from 'react-feather';
import { User } from 'react-feather';
import {
  updateFilterVideos,
  updateSearchVideos,
} from '../../store/catalogSlice';
import { useDebouncedCallback } from 'use-debounce';
import ButtonAuth from './ButtonAuth';
import InputSearch from './InputSearch';

export default function HeaderPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const location = useLocation();
  // const user = useSelector(userInfo);
  // const [search, setSearch] = useState('');
  // const debounced = useDebouncedCallback((value) => {
  //   dispatch(updateSearchVideos(value));
  // }, 1000);

  useEffect(() => {}, []);

  // const updateSearch = (value: string) => {
  //   setSearch(value);
  //   if (location.pathname === Routes.catalog) {
  //     debounced(value);
  //   }
  // };

  // const handleChangeSearch = (ev: { target: { value: string } }) => {
  //   updateSearch(ev.target.value);
  // };

  // const handleCleanSearch = () => {
  //   updateSearch('');
  // };

  // const handleSubmitSearch = (ev: any) => {
  //   ev.preventDefault();
  //   if (location.pathname !== Routes.catalog) {
  //     dispatch(updateSearchVideos(search));
  //     history.push(Routes.catalog);
  //   }
  // };

  const handleSubscribe = () => {
    history.push(Routes.subscription);
  };

  // const handleAuth = () => {
  //   dispatch(setIsShowAuth(true));
  // };

  // const handleClickUser = () => {
  //   history.push(Routes.profile);
  // };

  return (
    <div className={`d-flex align-items-center ${cls.wrapper}`}>
      <div className='container'>
        <div className={`row d-flex justify-content-between ${cls.headerRow}`}>
          <div
            className={`col-12 d-flex justify-content-between ${cls.header}`}
          >
            <h1 className={cls.h1}>
              <Link className={cls.logoLink} to={Routes.catalog}>
                AWplayer
              </Link>
            </h1>

            <InputSearch />

            <Button
              className={cls.subscribe}
              size='small'
              onClick={handleSubscribe}
            >
              <span className={cls.subscribeText}>Подписаться</span>
              <Cast className={cls.subscribeIcon} size={24} />
            </Button>

            <ButtonAuth />
          </div>
        </div>
      </div>
    </div>
  );
}
