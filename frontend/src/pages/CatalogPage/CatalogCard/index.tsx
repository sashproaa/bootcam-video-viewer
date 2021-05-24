import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Video } from '../../../common/interfaces/VideoInterface';
import { Routes } from '../../../common/enums/RoutesEnum';
import './style.css';
import { useDispatch } from 'react-redux';
import { setVideo } from '../../../store/videoSlice';

interface Props {
  video: Video;
}

export default function CatalogCard({ video }: Props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEdit = (ev: any) => {
    ev.stopPropagation();
    ev.preventDefault();
    dispatch(setVideo(video));
    history.push(`${Routes.editor}/${video.id}`);
  };

  return (
    <div className='col-12 col-md-6 col-xl-4 video-block'>
      <Link to={`${Routes.video}/${video.id}`}>
        <div className='block-1 video'>
          <img className='cardImage' src={video.image} alt={video.title} />
          <div className='info'>
            <p>{video.description}</p>
          </div>
          {/*<Link className='btn btn-light' to={`${Routes.editor}/${video.id}`}>Edit</Link>*/}
          <button className='btn btn-light edit-video' onClick={handleEdit}>
            Edit
          </button>
        </div>
        <strong>{video.title}</strong>
      </Link>
    </div>
  );
}
