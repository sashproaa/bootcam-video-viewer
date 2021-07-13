import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Routes } from '../../common/enums/RoutesEnum';
import cls from './style.module.css';
import Button from '../Button';
import { Cast } from 'react-feather';
import ButtonAuth from './ButtonAuth';
import InputSearch from './InputSearch';
import { SettingsContext } from '../App/App';

export default function HeaderPage() {
  const history = useHistory();
  const settings = useContext(SettingsContext);

  useEffect(() => {}, []);

  const handleSubscribe = () => {
    history.push(Routes.subscription);
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

            <InputSearch />

            {settings.showSubscription && (
              <Button
                className={cls.subscribe}
                size='small'
                onClick={handleSubscribe}
              >
                <span className={cls.subscribeText}>Подписаться</span>
                <Cast className={cls.subscribeIcon} size={24} />
              </Button>
            )}

            <ButtonAuth />
          </div>
        </div>
      </div>
    </div>
  );
}
