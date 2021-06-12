import React from 'react';
import cls from './style.module.css';
import Button from '../../../components/Button';
import { Subscription } from '../../../common/interfaces/SubscriptionInterface';
import ButtonLine from '../../../components/ButtonLine';

interface Props {
  subscription: Subscription;
  className?: string;
  type?: 'extend' | 'buy' | 'management';
  onBuy?: () => void;
}

export default function SubscriptionCard({
  subscription,
  className = '',
  type = 'extend',
  onBuy = () => {},
}: Props) {
  const handleBuy = () => {
    onBuy();
  };

  return (
    <div className={`${cls.subscriptionCard} ${cls[type]} ${className}`}>
      <div className={`${cls.cardDescription}`}>
        <h3 className={cls.cardName}>{subscription.name}</h3>
        {(type === 'extend' || type === 'management') && (
          <div className={cls.cardText}>
            Подписка действительна до {subscription.data_end}
          </div>
        )}
        {type === 'buy' && (
          <div className={cls.cardText}>
            Просмотр всех спектаклей в течении {subscription.duration} дней
          </div>
        )}
        {type === 'management' && (
          <div className={cls.cardAction}>
            <button className={cls.cardActionBtn}>Отменить подписку</button>
            <button className={cls.cardActionBtn}>Подробнее о подписке</button>
          </div>
        )}
      </div>
      <div>
        {(type === 'extend' || type === 'management') && (
          <Button className={cls.cardBtn}>Продлить</Button>
        )}
        {type === 'buy' && (
          <ButtonLine className={cls.cardBtn} onClick={handleBuy}>
            Купить за {subscription.price} грн
          </ButtonLine>
        )}
      </div>
    </div>
  );
}
