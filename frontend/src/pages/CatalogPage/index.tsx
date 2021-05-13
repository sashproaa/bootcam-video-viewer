import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { Col, Row } from 'react-bootstrap';
import CatalogCard from './CatalogCard';
import {
  isLoading,
  allVideos,
  countVideos,
  fetchVideos,
  genresVideos,
  fetchNextVideos,
} from '../../store/catalogSlice';
import Spinner from '../../components/Spinner';
import cls from './index.module.css';

export default function CatalogPage() {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const videos = useSelector(allVideos);
  const count = useSelector(countVideos);
  const genres = useSelector(genresVideos);

  useEffect(() => {
    // dispatch(fetchVideos({ limit: 10 }));
  }, []);

  const loadNextVideos = () => {
    dispatch(fetchNextVideos({ limit: 10 }));
  };

  return (
    <div>
      {loading && videos.length === 0 ? (
        <Spinner />
      ) : (
        <div className={cls.wrap}>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadNextVideos}
            hasMore={true}
            loader={
              <div className='loader' key={0}>
                Loading ...
              </div>
            }
            // useWindow={false}
          >
            {videos.map((video) => (
              <Col key={video.id} xs='auto' xl={6}>
                <CatalogCard video={video} />
              </Col>
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}
