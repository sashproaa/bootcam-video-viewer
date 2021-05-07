import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import CatalogCard from './CatalogCard';
import {
  allVideos,
  countVideos,
  fetchVideos,
  genresVideos,
} from '../../store/catalogSlice';

export default function CatalogPage() {
  const dispatch = useDispatch();
  const videos = useSelector(allVideos);
  const count = useSelector(countVideos);
  const genres = useSelector(genresVideos);

  useEffect(() => {
    dispatch(fetchVideos());
  }, []);

  return (
    <div>
      <Row>
        {videos.map((video) => (
          <Col key={video.id}>
            <CatalogCard video={video} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
