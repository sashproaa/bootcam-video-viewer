import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchVideo, isLoading, videoInfo } from '../../../store/videoSlice';
import CatalogCard from '../../CatalogPage/CatalogCard';
import { userActiveVideoInfo } from '../../../store/userSlice';
import Spinner from '../../../components/Spinner';

import cls from './style.module.css';

interface Props {
  className?: string;
}

export default function ActiveVideo({ className = '' }: Props) {
  const dispatch = useDispatch();
  const activeVideo = useSelector(userActiveVideoInfo);
  const loading = useSelector(isLoading);
  const video = useSelector(videoInfo);

  useEffect(() => {
    if (activeVideo && activeVideo.id) dispatch(fetchVideo(activeVideo.id));
  }, [activeVideo]);

  return (
    <div className={`${cls.activeVideo} ${className}`}>
      {activeVideo &&
        activeVideo.id &&
        (loading ? <Spinner /> : <CatalogCard video={video} />)}
    </div>
  );
}
