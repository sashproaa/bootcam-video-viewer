import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { Video } from '../../../common/interfaces/VideoInterface';
import { Routes } from '../../../common/enums/RoutesEnum';

interface Props {
  video: Video;
}

export default function CatalogCard({ video }: Props) {
  return (
    <Card style={{ width: '30rem', margin: '2rem' }}>
      <Card.Img
        variant='top'
        src={video.image}
        style={{ width: '30rem', height: '20rem' }}
      />
      <Card.Body>
        <Card.Title>{video.title}</Card.Title>
        <Card.Text>{video.description}</Card.Text>
        <Link to={`${Routes.video}/${video.id}`}>
          <Button variant='primary'>Go to video</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
