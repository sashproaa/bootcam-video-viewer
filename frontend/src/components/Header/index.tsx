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
import { updateFilterVideos } from '../../store/catalogSlice';
import { useDebouncedCallback } from 'use-debounce';

export default function HeaderPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector(userInfo);
  const [search, setSearch] = useState('');
  const debounced = useDebouncedCallback((value) => {
    dispatch(updateFilterVideos({ search: value }));
  }, 1000);

  useEffect(() => {}, []);

  const updateSearch = (value: string) => {
    setSearch(value);
    if (location.pathname === Routes.catalog) {
      debounced(value);
    }
  };

  const handleChangeSearch = (ev: { target: { value: string } }) => {
    updateSearch(ev.target.value);
  };

  const handleCleanSearch = () => {
    updateSearch('');
  };

  const handleSubmitSearch = (ev: any) => {
    ev.preventDefault();
    if (location.pathname !== Routes.catalog) {
      dispatch(updateFilterVideos({ search }));
      history.push(Routes.catalog);
    }
  };

  const handleSubscribe = () => {
    history.push(Routes.subscription);
  };

  const handleAuth = () => {
    dispatch(setIsShowAuth(true));
  };

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

            <form className={cls.searchForm} onSubmit={handleSubmitSearch}>
              <label className={cls.labelSearch} htmlFor='search'>
                <Search className={cls.searchMark} size={24} />
              </label>
              <input
                className={cls.input}
                type='text'
                placeholder='Поиск'
                id='search'
                value={search}
                onChange={handleChangeSearch}
              />
              <label className={cls.labelX} htmlFor='search'>
                <X
                  className={cls.xMark}
                  size={24}
                  onClick={handleCleanSearch}
                />
              </label>
            </form>

            <Button
              className={cls.subscribe}
              size='small'
              onClick={handleSubscribe}
            >
              <span className={cls.subscribeText}>Подписаться</span>
              <Cast className={cls.subscribeIcon} size={24} />
            </Button>

            <ButtonClean
              className={cls.auth}
              size='small'
              style='uppercase'
              onClick={handleAuth}
            >
              <span className={cls.subscribeText}>Войти</span>
              <LogIn className={cls.authIcon} size={24} />
            </ButtonClean>
            <button className={cls.btnUser}>
              <User size={45} />
              <img className={cls.userImg} src={user.avatar} alt={user.name} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
