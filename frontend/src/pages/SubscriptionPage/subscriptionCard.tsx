import React from 'react';

import { Subscription } from '../../common/interfaces/SubscriptionInterface';
import ButtonLine from '../../components/ButtonLine';

import cardBg from '../../assets/colage.png';

import cls from './style.module.css';

interface Props {
  subscription: Subscription;
  onBuy: () => void;
  disabled?: boolean;
}

export default function SubscriptionCard({
  subscription,
  onBuy,
  disabled = false,
}: Props) {
  return (
    <div className={`${cls.card} ${disabled ? cls.disabled : ''}`}>
      <img className={cls.imgBg} src={cardBg} alt={subscription.name} />
      <div className={cls.inside}>
        <h2 className={cls.title}>{subscription.name}</h2>
        <p className={cls.description}>
          Просмотр всех спектаклей театра МДТ в течение{' '}
          {+subscription.duration.split(':')[1]} месяц(ев) в Full HD качестве
        </p>
        <h3 className={cls.price}>{subscription.price} грн.</h3>
        <ButtonLine
          className={cls.button}
          fill
          disabled={disabled}
          onClick={onBuy}
        >
          Оформить подписку
        </ButtonLine>
      </div>
    </div>
  );
}
