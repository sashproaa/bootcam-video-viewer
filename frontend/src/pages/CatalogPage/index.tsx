import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import CatalogCard from './CatalogCard';
import {
  isLoading,
  allVideos,
  countVideos,
  fetchVideos,
  genresVideos,
} from '../../store/catalogSlice';
import Spinner from '../../components/Spinner';

export default function CatalogPage() {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const videos = useSelector(allVideos);
  const count = useSelector(countVideos);
  const genres = useSelector(genresVideos);

  useEffect(() => {
    dispatch(fetchVideos());
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Row>
          {videos.map((video) => (
            <Col key={video.id} xs='auto' xl={6}>
              <CatalogCard video={video} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
