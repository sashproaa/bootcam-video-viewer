import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { Search, Delete } from 'react-feather';

import { Routes } from '../../common/enums/RoutesEnum';
import {
  searchVideos,
  setSearch,
  updateFilterVideos,
  updateSearchVideos,
} from '../../store/catalogSlice';

import cls from './style.module.css';

export default function InputSearch() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const search = useSelector(searchVideos);
  const debounced = useDebouncedCallback((value) => {
    dispatch(updateFilterVideos({ title: value }));
  }, 1000);

  useEffect(() => {}, []);

  const updateSearch = (value: string) => {
    dispatch(setSearch(value));
    if (location.pathname === Routes.catalog) {
      debounced(value);
    }
  };

  const handleChangeSearch = (ev: { target: { value: string } }) => {
    updateSearch(ev.target.value);
  };

  const handleCleanSearch = () => {
    dispatch(setSearch(''));
    dispatch(updateFilterVideos({ title: '', actors: '' }));
  };

  const handleSubmitSearch = (ev: any) => {
    ev.preventDefault();
    if (location.pathname !== Routes.catalog) {
      dispatch(updateSearchVideos(search));
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
        <Delete className={cls.xMark} size={24} onClick={handleCleanSearch} />
      </label>
    </form>
  );
}
