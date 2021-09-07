import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  allSubscriptions,
  fetchSubscriptions,
} from '../../../store/subscriptionSlice';
import SubscriptionCard from './SubscriptionCard';

import cls from './style.module.css';

interface Props {
  className?: string;
}

export default function Management({ className = '' }: Props) {
  const dispatch = useDispatch();
  const subscriptions = useSelector(allSubscriptions);

  const activeSubscriptions = subscriptions[0] ? [subscriptions[0]] : [];

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, []);

  return (
    <div className={className}>
      <section className={`${cls.section}`}>
        <h2 className={cls.header}>Мои подписки</h2>
        {activeSubscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription.id}
            type='management'
            subscription={subscription}
          />
        ))}
      </section>
    </div>
  );
}
