import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import Header from '../Header';
import Bought from './Bought';
import ActiveVideo from './ActiveVideo';

import cls from './style.module.css';

interface Props {
  className?: string;
}

export default function Video({ className = '' }: Props) {
  return (
    <div className={className}>
      <Header>
        <h2>Мои спектакли</h2>
      </Header>

      <Tabs className='tabs' defaultActiveKey='active' id='subscription-tabs'>
        <Tab className={cls.tab} eventKey='active' title='Активное видео'>
          <ActiveVideo />
        </Tab>
        <Tab eventKey='bought' title='Купленные'>
          <Bought />
        </Tab>
      </Tabs>
    </div>
  );
}
