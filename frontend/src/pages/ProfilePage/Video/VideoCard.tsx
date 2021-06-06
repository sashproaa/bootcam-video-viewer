import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';
import cls from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  allSubscriptions,
  fetchSubscriptions,
} from '../../../store/subscriptionSlice';
import { historyTransactions } from '../../../store/paymentSlice';
import { Video } from '../../../common/interfaces/VideoInterface';
import { Routes } from '../../../common/enums/RoutesEnum';

interface Props {
  className?: string;
  video: Video;
}

export default function VideoCard({ className = '', video }: Props) {
  return (
    <Link
      className={`${cls.card} ${className}`}
      to={`${Routes.video}/${video.id}`}
    >
      <img className={cls.cardImg} src={video.image} alt={video.title} />
      <div className={cls.cardTitle}>{video.title}</div>
    </Link>
  );
}
