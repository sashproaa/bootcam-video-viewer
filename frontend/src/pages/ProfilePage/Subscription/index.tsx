import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import cls from './style.module.css';

interface Props {
  className?: string;
}

export default function Subscription({ className = '' }: Props) {
  return (
    <div className={className}>
      <h2>Подписки и платежи</h2>
      <Tabs
        className='tabs'
        defaultActiveKey='profile'
        id='uncontrolled-tab-example'
      >
        <Tab className={cls.tab} eventKey='home' title='Подписки'>
          <div>Подписки</div>
        </Tab>
        <Tab eventKey='profile' title='Управление подписками'>
          <div>Управление подписками</div>
        </Tab>
        <Tab eventKey='contact' title='История платежей'>
          <div>История платежей</div>
        </Tab>
      </Tabs>
    </div>
  );
}
