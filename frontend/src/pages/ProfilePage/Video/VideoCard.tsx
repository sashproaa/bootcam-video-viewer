import React from 'react';
import { Link } from 'react-router-dom';

import { Video } from '../../../common/interfaces/VideoInterface';
import { Routes } from '../../../common/enums/RoutesEnum';

import cls from './style.module.css';

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
