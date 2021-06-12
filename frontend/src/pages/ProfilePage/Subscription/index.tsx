import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import cls from './style.module.css';
import Subscriptions from './Subscriptions';
import Management from './Management';
import History from './History';
import Header from '../Header';

interface Props {
  className?: string;
}

export default function Subscription({ className = '' }: Props) {
  return (
    <div className={className}>
      <Header>
        <h2>Подписки и платежи</h2>
      </Header>

      <Tabs
        className='tabs'
        defaultActiveKey='subscriptions'
        id='subscription-tabs'
      >
        <Tab className={cls.tab} eventKey='subscriptions' title='Подписки'>
          <Subscriptions />
        </Tab>
        {/*<Tab eventKey='management' title='Управление подписками'>*/}
        {/*  <Management />*/}
        {/*</Tab>*/}
        <Tab eventKey='history' title='История платежей'>
          <History />
        </Tab>
      </Tabs>
    </div>
  );
}
