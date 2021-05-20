import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../../../common/interfaces/VideoInterface';
import { Routes } from '../../../common/enums/RoutesEnum';
import './style.css';

interface Props {
  video: Video;
}

export default function CatalogCard({ video }: Props) {
  return (
    <div className='col-12 col-md-6 col-xl-4 video-block'>
      <Link to={`${Routes.video}/${video.id}`}>
        <div className='block-1 video'>
          <img className='cardImage' src={video.image} alt={video.title} />
          <div className='info'>
            <p>{video.description}</p>
          </div>
        </div>
        <strong>{video.title}</strong>
      </Link>
    </div>
  );
}
