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
import { updateFilterVideos } from '../../store/catalogSlice';
import { useDebouncedCallback } from 'use-debounce';

export default function InputSearch() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
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

  return (
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
        <X className={cls.xMark} size={24} onClick={handleCleanSearch} />
      </label>
    </form>
  );
}
