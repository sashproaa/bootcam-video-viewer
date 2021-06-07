import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import cls from './style.module.css';
import { Routes } from '../../common/enums/RoutesEnum';

interface Props {
  children: JSX.Element | JSX.Element[] | string | string[] | null;
  href?: Routes;
}

export default function GoBack({ children, href }: Props) {
  const history = useHistory();

  const handleRoute = (ev: any) => {
    ev.preventDefault();
    if (href) history.push(href);
    else history.goBack();
  };

  return (
    <div className={`${cls.root} d-flex align-items-center`}>
      <a
        className={`${cls.link} d-flex align-items-center`}
        href='#'
        onClick={handleRoute}
      >
        <ArrowLeft className={cls.icon} size={20} />
        {children}
      </a>
    </div>
  );
}
