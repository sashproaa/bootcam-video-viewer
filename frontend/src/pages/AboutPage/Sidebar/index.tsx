import React from 'react';
import cls from './style.module.css';

export default function SideBar() {
  return (
    <>
      <menu className={cls.links}>
        <a className={cls.link} href='#about-about'>
          О нас
        </a>
        <a className={cls.link} href='#about-contacts'>
          Контакты
        </a>
        <a className={cls.link} href='#about-payment'>
          Оплата
        </a>
        <a className={cls.link} href='#about-refund'>
          Возврат
        </a>
        <a className={cls.link} href='#about-privacy'>
          Политика конфиденциальности
        </a>
      </menu>
    </>
  );
}
