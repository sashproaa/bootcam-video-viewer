import React from 'react';
import cls from './style.module.css';
import { Tab, Tabs } from 'react-bootstrap';

interface Props {
  className?: string;
}

export default function Subscription({ className = '' }: Props) {
  return (
    <div className={className}>
      <h2>Подписки и платежи</h2>
      <Tabs defaultActiveKey='profile' id='uncontrolled-tab-example'>
        <Tab eventKey='home' title='Подписки'>
          <div>qqq</div>
        </Tab>
        <Tab eventKey='profile' title='Управление подписками'>
          <div>www</div>
        </Tab>
        <Tab eventKey='contact' title='История платежей'>
          <div>eee</div>
        </Tab>
      </Tabs>
    </div>
  );
}
