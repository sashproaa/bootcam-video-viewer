import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { Button, Col, Row } from 'react-bootstrap';
import { fetchVideo, videoInfo } from '../../store/videoSlice';
import VideoSlider from './VideoSlider';
import { Routes } from '../../common/enums/RoutesEnum';

export default function VideoPage() {
  const dispatch = useDispatch();
  const video = useSelector(videoInfo);
  const params = useParams() as { id: string };
  const id = Number(params.id);

  const [player, setPlayer] = useState<ReactPlayer | null>(null);

  useEffect(() => {
    dispatch(fetchVideo(id));
  }, []);

  return (
    <div>
      <div className='mb-5'>
        <ReactPlayer
          ref={setPlayer}
          width='100%'
          height='auto'
          controls={true}
          url={video.preview}
        />
      </div>
      <Row>
        <Col>
          <h1>{video.title}</h1>
        </Col>
        <Col>
          <Link to={Routes.subscription}>
            <Button className='mr-3'>Оплатить подписку</Button>
          </Link>
          <Button className='mr-3'>Купить билет</Button>
        </Col>
      </Row>
      <p>{video.description}</p>
      <div className='mt-5 mb-5'>
        <VideoSlider />
      </div>
    </div>
  );
}
