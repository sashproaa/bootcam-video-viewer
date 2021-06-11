import React from 'react';
import cls from './style.module.css';
import Header from '../Header';
import { Tab, Tabs } from 'react-bootstrap';
import Subscriptions from '../Subscription/Subscriptions';
import Management from '../Subscription/Management';
import History from '../Subscription/History';
import Bought from './Bought';
import ActiveVideo from './ActiveVideo';

interface Props {
  className?: string;
}

export default function Video({ className = '' }: Props) {
  return (
    <div className={className}>
      <Header>
        <h2>Мои спектакли</h2>
      </Header>

      <Tabs className='tabs' defaultActiveKey='bought' id='subscription-tabs'>
        <Tab className={cls.tab} eventKey='active' title='Активное видео'>
          <ActiveVideo />
        </Tab>
        {/*<Tab*/}
        {/*  className={cls.tab}*/}
        {/*  eventKey='history'*/}
        {/*  title='История просмотров'*/}
        {/*  disabled*/}
        {/*>*/}
        {/*  <div></div>*/}
        {/*</Tab>*/}
        <Tab eventKey='bought' title='Купленные'>
          <Bought />
        </Tab>
      </Tabs>
    </div>
  );
}
