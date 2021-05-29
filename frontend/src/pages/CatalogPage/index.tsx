import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import CatalogCard from './CatalogCard';
import {
  isLoading,
  allVideos,
  countVideos,
  fetchVideos,
  genresVideos,
  fetchNextVideos,
  filterVideos,
  updateFilterVideos,
} from '../../store/catalogSlice';
import Spinner from '../../components/Spinner';
import GenresFilter from './GenresFilter';
// import './style.css';
import cls from './style.module.css';

const genresTest = ['Комедия', 'Драма', 'Мелодрама', 'Трагедия', 'Ужасы'];

export default function CatalogPage() {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const videos = useSelector(allVideos);
  const count = useSelector(countVideos);
  const genres = useSelector(genresVideos);
  const filter = useSelector(filterVideos);

  useEffect(() => {
    dispatch(fetchVideos());
  }, []);

  const loadNextVideos = () => {
    dispatch(fetchNextVideos());
  };

  const handleChangeGenre = (genre: string) => {
    dispatch(updateFilterVideos({ genre }));
  };

  return (
    <div>
      {loading && videos.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <GenresFilter
            genres={genres}
            activeGenre={filter.genre || ''}
            changeGenre={handleChangeGenre}
          />

          <InfiniteScroll
            className={`row ${cls.content}`}
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
              <CatalogCard
                className={`col-12 col-md-6 col-xl-4 ${cls.block}`}
                key={video.id}
                video={video}
              />
            ))}
          </InfiniteScroll>
        </>
      )}
    </div>
  );
}
