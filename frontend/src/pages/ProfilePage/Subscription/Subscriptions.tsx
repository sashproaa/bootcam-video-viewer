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

export default function Subscriptions({ className = '' }: Props) {
  const dispatch = useDispatch();
  const subscriptions = useSelector(allSubscriptions);

  const activeSubscriptions = subscriptions.filter(
    (subscription) => subscription.paid,
  );
  const subscriptionsBuy = subscriptions.filter(
    (subscription) => !subscription.paid,
  );

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, []);

  return (
    <div className={className}>
      <section className={`${cls.section} ${cls.my}`}>
        <h2 className={cls.header}>Мои подписки</h2>
        {activeSubscriptions.length === 0 && (
          <h3 className='ml-2 mr-2 text-center'>У вас нет активных подписок</h3>
        )}
        {activeSubscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription.id}
            type='extend'
            subscription={subscription}
          />
        ))}
      </section>

      <section className={`${cls.section}`}>
        <h2 className={cls.header}>Основные подписки</h2>
        {subscriptionsBuy.map((subscription) => (
          <SubscriptionCard
            key={subscription.id}
            type='buy'
            subscription={subscription}
          />
        ))}
      </section>
    </div>
  );
}
