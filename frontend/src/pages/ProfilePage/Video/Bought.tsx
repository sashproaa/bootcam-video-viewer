import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  allVideos,
  countVideos,
  fetchNextVideos,
  fetchVideos,
  isLoading,
} from '../../../store/catalogContentSlice';
import VideoCard from './VideoCard';
import cls from './style.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  className?: string;
}

export default function Bought({ className = '' }: Props) {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const videos = useSelector(allVideos);
  const count = useSelector(countVideos);

  useEffect(() => {
    dispatch(fetchVideos());
  }, []);

  const loadNextVideos = () => {
    dispatch(fetchNextVideos());
  };

  return (
    // <div className={cls.bought}>
    //   {videos.map((video) => (
    //     <VideoCard video={video} />
    //   ))}
    // </div>

    <InfiniteScroll
      className={`row ${cls.bought}`}
      dataLength={videos.length}
      next={loadNextVideos}
      hasMore={count != videos.length}
      loader={
        <div className='loader' key={0}>
          Loading ...
        </div>
      }
    >
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </InfiniteScroll>
  );
}
