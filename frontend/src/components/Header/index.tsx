import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Routes } from '../../common/enums/RoutesEnum';
import cls from './style.module.css';
import './style.css';
import tt from '../../assets/ticket.svg';
import { IoTicket } from 'react-icons/io5';
import { IoLogInOutline } from 'react-icons/io5';
import { IoLogIn } from 'react-icons/io5';

export default function HeaderPage() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  useEffect(() => {}, []);

  const handleAuth = () => {};

  const handleSearch = (ev: { target: { value: string } }) => {
    setTitle(ev.target.value);
  };

  return (
    <div className='wrapper-head d-flex align-items-center'>
      <div className='container'>
        <div className='row header-row d-flex justify-content-between'>
          <div className='col-12 header d-flex justify-content-between'>
            <h1>
              <Link className='logoLink' to={Routes.catalog}>
                AWplayer
              </Link>
            </h1>

            <div className='registr d-flex'>
              <form className='search-form'>
                <label htmlFor='search'>
                  <span className='searching-mark'></span>
                </label>
                <input
                  type='text'
                  placeholder='Поиск'
                  id='search'
                  value={title}
                  onChange={handleSearch}
                />
              </form>
              <Link to={Routes.subscription}>
                {/*<button className='subscribe'>Подписаться</button>*/}
                <button className='subscribe'>
                  <span className='subscribe-text'>Подписаться</span>
                  <span className='subscribe-icon'>
                    <IoTicket size={24} />
                  </span>
                </button>
              </Link>
              <button className='enter' onClick={handleAuth}>
                <span className='auth-text'>Войти</span>
                <span className='auth-icon'>
                  <IoLogInOutline size={32} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
