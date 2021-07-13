import React, { useContext } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import cls from './style.module.css';
import Subscriptions from './Subscriptions';
import Management from './Management';
import History from './History';
import Header from '../Header';
import { SettingsContext } from '../../../components/App/App';

interface Props {
  className?: string;
}

export default function Subscription({ className = '' }: Props) {
  const settings = useContext(SettingsContext);

  return (
    <div className={className}>
      <Header>
        <h2>{settings.showSubscription ? 'Подписки и платежи' : 'Платежи'}</h2>
      </Header>

      <Tabs
        className='tabs'
        defaultActiveKey={
          settings.showSubscription ? 'subscriptions' : 'history'
        }
        id='subscription-tabs'
      >
        {settings.showSubscription && (
          <Tab className={cls.tab} eventKey='subscriptions' title='Подписки'>
            <Subscriptions />
          </Tab>
        )}

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
