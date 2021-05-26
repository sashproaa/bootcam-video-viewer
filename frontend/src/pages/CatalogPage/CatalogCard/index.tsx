import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Video } from '../../../common/interfaces/VideoInterface';
import { Routes } from '../../../common/enums/RoutesEnum';
// import './style.css';
import { useDispatch } from 'react-redux';
import { setVideo } from '../../../store/videoSlice';
import cls from './style.module.css';
import { IoPlaySharp } from 'react-icons/io5';
import ButtonPlay from '../../../components/ButtonPlay';
import { images } from '../../../common/helpers/imageMockHelper';

interface Props {
  className?: string;
  video: Video;
}

export default function CatalogCard({ className = '', video }: Props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEdit = (ev: any) => {
    ev.stopPropagation();
    ev.preventDefault();
    dispatch(setVideo(video));
    history.push(`${Routes.editor}/${video.id}`);
  };

  return (
    <>
      {/*<div className='col-12 col-md-6 col-xl-4 video-block'>*/}
      {/*  <Link to={`${Routes.video}/${video.id}`}>*/}
      {/*    <div className='block-1 video'>*/}
      {/*      <img className='cardImage' src={video.image} alt={video.title} />*/}
      {/*      <div className='info'>*/}
      {/*        <p>{video.description}</p>*/}
      {/*      </div>*/}
      {/*      /!*<Link className='btn btn-light' to={`${Routes.editor}/${video.id}`}>Edit</Link>*!/*/}
      {/*      <button className='btn btn-light edit-video' onClick={handleEdit}>*/}
      {/*        Edit*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*    <strong>{video.title}</strong>*/}
      {/*  </Link>*/}
      {/*</div>*/}

      <div className={`${cls.block} ${className}`}>
        <Link className={cls.link} to={`${Routes.video}/${video.id}`}>
          <div className={cls.video}>
            <img
              className={cls.img}
              src={video.image || images[video.id]}
              alt={video.title}
            />
            <div className={cls.info}>
              <p className={cls.description}>{video.description}</p>
              <ButtonPlay className={cls.play} />
            </div>
          </div>
          <strong className={cls.title}>{video.title}</strong>
        </Link>
      </div>
    </>
  );
}
