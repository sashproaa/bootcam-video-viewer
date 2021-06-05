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
import cardBg from '../../assets/colage.png';
import ButtonLine from '../../components/ButtonLine';
import Spinner from '../../components/Spinner';

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
            <div className={`${cls.card}`}>
              <img className={cls.imgBg} src={cardBg} alt={subscription.name} />
              <div className={cls.inside}>
                <h2 className={cls.title}>{subscription.name}</h2>
                <p className={cls.description}>
                  Просмотр всех спектаклей театра МДТ в течение{' '}
                  {subscription.duration} дней в Full HD качестве
                </p>
                <h3 className={cls.price}>{subscription.price} грн.</h3>
                <ButtonLine
                  className={cls.button}
                  fill
                  onClick={handlePayment(subscription)}
                >
                  Оформить подписку
                </ButtonLine>
              </div>
            </div>
          </div>
          // </a>
        ))}
      </div>
    </>
  );
}
