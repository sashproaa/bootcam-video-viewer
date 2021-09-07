import React from 'react';
import { Mail, Phone, MapPin } from 'react-feather';

import { Routes } from '../../common/enums/RoutesEnum';
import GoBack from '../../components/GoBack';
import SideBar from './Sidebar';
import Title from '../../components/Title';
import PrivacyText from '../../components/PrivacyText';

import visaImg from '../../assets/visa-logo.png';
import mastercardImg from '../../assets/mastercard-logo.png';

import cls from './style.module.css';

export default function AboutPage() {
  return (
    <>
      <GoBack href={Routes.catalog}>Каталог</GoBack>
      <div className='row'>
        <div className={`col-4 ${cls.sidebar}`}>
          <SideBar />
        </div>
        <div className={`col-8 ${cls.main}`}>
          <section id='about-about' className={cls.section}>
            <Title type='h2'>О нас</Title>
            <p>
              Необычный молодежный театр из Харькова объединил много городов
              Украины и Европы и является одним из множества творческих
              коллективов Национального юридический университет имени Ярослава
              Мудрого, который по своему статусу является единственным в Украине
              профессиональным студенческим театром. МДТ неоднократно становился
              победителем и лауреатом студенческих и профессиональных
              международных театральных фестивалей. Театр идёт в ногу со
              временем и сейчас на сайте доступна покупка спектаклей в записи,
              что позволяет приобщаться к театральному искусству с любой точки
              мира.
            </p>
          </section>

          <section id='about-contacts' className={cls.section}>
            <Title type='h2'>Контакты</Title>
            <p>
              <Mail className={cls.icon} size={24} />
              <a className={cls.link} href='mailto:theatermdt@gmail.com'>
                theatermdt@gmail.com
              </a>
            </p>
            <p>
              <Phone className={cls.icon} size={24} />
              <a className={cls.link} href='tel:+380631030080'>
                +38 063 103 0080
              </a>
            </p>
            <p>
              <MapPin className={cls.icon} size={24} />
              <a
                className={cls.link}
                href='https://goo.gl/maps/71vZpytubyGPi4xDA'
              >
                Pushkins'ka St, 88, Kharkiv, Kharkiv Oblast, Ukraine, 61000
              </a>
            </p>
          </section>

          <section id='about-payment' className={cls.section}>
            <Title type='h2'>Оплата</Title>
            <p>
              Оплатить просмотр спектакля можно банковской картой на сайте. Это
              безопасно, мгновенно и без комиссии. Оплата происходит с помощью
              защищенной платежной системы. Поддерживаемые карты: Visa,
              MasterCard. Ваши данные не будут передаваться третьим лицам. Карта
              автоматически привязывается к профилю после первой покупки. После
              оплаты спектакль появляется в разделе «Мои спектакли». С этого
              момента его можно смотреть на всех устройствах, подключенных к
              профилю.
            </p>
            <div className={cls.cards}>
              <img src={visaImg} alt='visa logo' />
              <img src={mastercardImg} alt='mastercard logo' />
            </div>
          </section>

          <section id='about-refund' className={cls.section}>
            <Title type='h2'>Возврат</Title>
            <p>
              Для возврата средств обратитесь в службу поддержки. Для этого есть
              несколько вариантов:
              <ul className={cls.refunds}>
                <li>
                  Отправить письмо на электронную почту{' '}
                  <a className={cls.link} href='mailto:theatermdt@gmail.com'>
                    theatermdt@gmail.com
                  </a>
                </li>
                <li>
                  Позвонить{' '}
                  <a className={cls.link} href='tel:+380631030080'>
                    +38 063 103 0080
                  </a>
                </li>
              </ul>
            </p>
          </section>

          <section id='about-privacy' className={cls.section}>
            <PrivacyText />
          </section>
        </div>
      </div>
    </>
  );
}
