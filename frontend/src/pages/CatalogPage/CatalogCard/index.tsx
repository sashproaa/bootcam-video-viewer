import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Video } from '../../../common/interfaces/VideoInterface';

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
        <Button variant='primary'>Go to video</Button>
      </Card.Body>
    </Card>
  );
}
