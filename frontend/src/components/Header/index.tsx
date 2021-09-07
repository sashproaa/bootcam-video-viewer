import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Cast, Info } from 'react-feather';

import { Routes } from '../../common/enums/RoutesEnum';
import Button from '../Button';
import ButtonAuth from './ButtonAuth';
import InputSearch from './InputSearch';
import { SettingsContext } from '../App/App';
import ButtonClean from '../ButtonClean';

import cls from './style.module.css';

export default function HeaderPage() {
  const history = useHistory();
  const settings = useContext(SettingsContext);

  useEffect(() => {}, []);

  const handleSubscribe = () => {
    history.push(Routes.subscription);
  };

  const handleAbout = () => {
    history.push(Routes.about);
  };

  return (
    <div className={`d-flex align-items-center ${cls.wrapper}`}>
      <div className='container'>
        <div className={`row d-flex justify-content-between ${cls.headerRow}`}>
          <div
            className={`col-12 d-flex justify-content-between ${cls.header}`}
          >
            <div className={cls.title}>
              <Link className={cls.logoLink} to={Routes.catalog}>
                AWplayer
              </Link>
            </div>

            <InputSearch />

            <ButtonClean
              className={cls.about}
              size='small'
              style='uppercase'
              onClick={handleAbout}
            >
              <span className={cls.aboutText}>О нас</span>
              <Info className={cls.aboutIcon} size={24} />
            </ButtonClean>

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
