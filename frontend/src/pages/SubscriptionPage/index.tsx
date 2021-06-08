import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardDeck, Col, Row } from 'react-bootstrap';
import {
  isLoading,
  allSubscriptions,
  fetchSubscriptions,
} from '../../store/subscriptionSlice';
import { setPaymentData } from '../../store/paymentSlice';
import { Routes } from '../../common/enums/RoutesEnum';
import { Subscription } from '../../common/interfaces/SubscriptionInterface';
import GoBack from '../../components/GoBack';
import cls from './style.module.css';
import Spinner from '../../components/Spinner';
import SubscriptionCard from './subscriptionCard';

export default function SubscriptionPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(isLoading);
  const subscriptions = useSelector(allSubscriptions);

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, []);

  const handlePayment = (subscription: Subscription) => () => {
    dispatch(
      setPaymentData({
        data: {
          target: 'subscription',
          id: subscription.id,
          projectId: subscription.project_id,
        },
        price: subscription.price,
      }),
    );
    history.push(Routes.payment);
  };

  return (
    <>
      <GoBack>Назад</GoBack>
      <div className={cls.content}>
        <div className='row'>
          <h1 className={cls.header}>Выберите подписку</h1>
        </div>
        <div className='row'>
          <p className={cls.headerSub}>
            Смотрите ваши любимые спектакли театра МДТ в любое время <br /> и в
            Full HD качестве.
          </p>
        </div>
      </div>
      {loading && <Spinner />}
      <div className='row'>
        {subscriptions.map((subscription) => (
          // <a href='#'>
          <div className={`col-12 col-md-6 col-lg-4`}>
            <SubscriptionCard
              subscription={subscription}
              onBuy={handlePayment(subscription)}
              disabled={subscription.paid}
            />
          </div>
          // </a>
        ))}
      </div>
    </>
  );
}
