import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { Button, Col, Row } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  fetchVideo,
  videoInfo,
  isLoading,
  fetchUpdateVideo,
  fetchUpdatMedia,
} from '../../store/videoSlice';
import { Routes } from '../../common/enums/RoutesEnum';
import Spinner from '../../components/Spinner';
import { Video } from '../../common/interfaces/VideoInterface';
import { fetchVideos, genresVideos } from '../../store/catalogSlice';

interface VideoForm extends Omit<Video, 'image'> {
  image?: any;
}

export default function EditorPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(isLoading);
  const video = useSelector(videoInfo);
  const genres = useSelector(genresVideos);
  const params = useParams() as { id: string };
  const id = Number(params.id);

  const [media, setMedia] = useState({ image: '', preview_video: '' });
  const [src, setSrc] = useState({ image: '', preview_video: '' });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VideoForm>();

  const [player, setPlayer] = useState<ReactPlayer | null>(null);

  useEffect(() => {
    dispatch(fetchVideos());
    dispatch(fetchVideo(id));
  }, []);

  useEffect(() => {
    reset();
  }, [video]);

  const handleSave = () => {};

  const handleCancel = () => {
    history.goBack();
  };

  const handleReset = () => {
    reset();
  };

  const onSubmit: SubmitHandler<VideoForm> = (data) => {
    // const videoData = { ...data, ...media };
    // dispatch(fetchUpdateVideo(videoData as Video));
    dispatch(fetchUpdateVideo(data as Video));
  };

  const handleChangeMedia = ({ target }: any) => {
    const file = target.files[0];
    if (file) {
      dispatch(fetchUpdatMedia({ [target.name]: file } as Video));
    }

    // if (file) {
    //   setMedia({ ...media, [target.name]: file });
    //   const reader = new FileReader();
    //   reader.onloadend = function () {
    //     setSrc({ ...src, [target.name]: reader.result });
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className='d-flex align-items-center mb-3'>
            <h2 className='m-3'>Редактор</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
            <div>
              <img
                src={video.image}
                alt='Video image'
                width='100%'
                height='100%'
              />
              <div className='mb-3'>
                <label htmlFor='image' className='form-label btn btn-light'>
                  Open Image
                </label>
                <input
                  type='file'
                  className='form-control invisible'
                  id='image'
                  name='image'
                  onChange={handleChangeMedia}
                />
              </div>
            </div>

            <div className='mb-3'>
              <label htmlFor='preview_video' className='form-label'>
                Preview video
              </label>
              <input
                type='file'
                className='form-control'
                id='preview_video'
                name='preview_video'
                onChange={handleChangeMedia}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='title' className='form-label'>
                Title
              </label>
              <input
                type='text'
                className='form-control'
                id='title'
                defaultValue={video.title}
                {...register('title', { required: true })}
              />
              {/*<div id='titleHelp' className='form-text'>*/}
              {/*  We'll never share your title with anyone else.*/}
              {/*</div>*/}
            </div>

            <div className='mb-3'>
              <label htmlFor='description' className='form-label'>
                Description
              </label>
              <textarea
                className='form-control'
                id='description'
                defaultValue={video.description}
                {...register('description', { required: true })}
              />
            </div>

            {/*<div className='mb-3'>*/}
            {/*  <label htmlFor='genre' className='form-label'>*/}
            {/*    Genre*/}
            {/*  </label>*/}
            {/*  <select*/}
            {/*    multiple*/}
            {/*    className='form-control'*/}
            {/*    id='genre'*/}
            {/*    defaultValue={video.genre || []}*/}
            {/*    {...register('genre', { required: true })}*/}
            {/*  >*/}
            {/*    {genres.map((genre) => (*/}
            {/*      <option*/}
            {/*        key={genre[0]}*/}
            {/*        value={genre[0]}*/}
            {/*        // selected={video.genre.includes(genre[0])}*/}
            {/*      >*/}
            {/*        {genre[1]}*/}
            {/*      </option>*/}
            {/*    ))}*/}
            {/*  </select>*/}
            {/*</div>*/}

            <div className='mb-3'>
              <label htmlFor='actors' className='form-label'>
                Actors
              </label>
              <input
                type='text'
                className='form-control'
                id='actors'
                defaultValue={video.actors}
                {...register('actors', { required: true })}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='price' className='form-label'>
                Price
              </label>
              <input
                type='number'
                step='0.01'
                className='form-control'
                id='price'
                defaultValue={video.price}
                {...register('price', { required: true })}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='duration' className='form-label'>
                Duration
              </label>
              <input
                type='time'
                className='form-control'
                id='duration'
                defaultValue={video.duration}
                {...register('duration', { required: true })}
              />
            </div>

            {/*<div className='mb-3'>*/}
            {/*  <label htmlFor='image' className='form-label'>*/}
            {/*    Image*/}
            {/*  </label>*/}
            {/*  <input*/}
            {/*    type='file'*/}
            {/*    className='form-control'*/}
            {/*    id='image'*/}
            {/*    name='image'*/}
            {/*    onChange={handleChangeImage}*/}
            {/*  />*/}
            {/*</div>*/}

            {/*<div className='mb-3'>*/}
            {/*  <label htmlFor='preview_video' className='form-label'>*/}
            {/*    Preview video*/}
            {/*  </label>*/}
            {/*  <input*/}
            {/*    type='file'*/}
            {/*    className='form-control'*/}
            {/*    id='preview_video'*/}
            {/*    name='preview_video'*/}
            {/*    onChange={handleChangeImage}*/}
            {/*  />*/}
            {/*</div>*/}

            {/*<div className='mb-3'>*/}
            {/*  <label htmlFor='url' className='form-label'>*/}
            {/*    Url*/}
            {/*  </label>*/}
            {/*  <input*/}
            {/*    type='text'*/}
            {/*    className='form-control'*/}
            {/*    id='url'*/}
            {/*    defaultValue={video.url}*/}
            {/*    {...register('url', { required: true })}*/}
            {/*  />*/}
            {/*</div>*/}

            <button type='submit' className='btn btn-primary'>
              Сохранить
            </button>
            <button type='reset' className='btn btn-primary'>
              Сброс
            </button>
            <button className='btn btn-primary'>Отмена</button>
          </form>
        </>
      )}
    </div>
  );
}
