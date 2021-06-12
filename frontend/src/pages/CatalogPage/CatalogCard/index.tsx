import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Video } from '../../../common/interfaces/VideoInterface';
import { Routes } from '../../../common/enums/RoutesEnum';
import { useDispatch } from 'react-redux';
import { setVideo } from '../../../store/videoSlice';
import cls from './style.module.css';
import ButtonPlay from '../../../components/ButtonPlay';
import { images } from '../../../common/helpers/imageMockHelper';

interface Props {
  className?: string;
  video: Video;
  editable?: boolean;
}

export default function CatalogCard({
  className = '',
  video,
  editable = false,
}: Props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEdit = (ev: any) => {
    ev.stopPropagation();
    ev.preventDefault();
    dispatch(setVideo(video));
    history.push(`${Routes.editor}/${video.id}`);
  };

  return (
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

          {video.paid && <div className={cls.paid}>Куплено</div>}

          {/*{editable && (*/}
          {/*  <ButtonClean className={cls.edit} onClick={handleEdit}>*/}
          {/*    <Edit size={24} />*/}
          {/*  </ButtonClean>*/}
          {/*)}*/}
        </div>
        <strong className={cls.title}>{video.title}</strong>
      </Link>
    </div>
  );
}
