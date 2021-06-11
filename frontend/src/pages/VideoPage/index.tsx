import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import ReactPlayer from 'react-player';
import {
  fetchVideo,
  isLoading,
  saveTimeVideo,
  setVideo,
  videoInfo,
} from '../../store/videoSlice';
import { Routes } from '../../common/enums/RoutesEnum';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';
import cls from './style.module.css';
import ButtonLine from '../../components/ButtonLine';
import ClampLines from 'react-clamp-lines';
import './style.css';
import { images } from '../../common/helpers/imageMockHelper';
import { setPaymentData } from '../../store/paymentSlice';
import GoBack from '../../components/GoBack';
import VideoSlider from './VideoSlider';
import {
  genresVideos,
  setSearch,
  updateFilterVideos,
} from '../../store/catalogSlice';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { isAdminUser, userActiveVideoInfo } from '../../store/userSlice';
import ButtonPlay from '../../components/ButtonPlay';
import { Play } from 'react-feather';

// const testVideo = 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4';
const testVideo = 'https://www.dropbox.com/s/j9yjvmdq7lrw6fl/video720.mp4?dl=0';
const intervalSave = 5000;

interface Progress {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

export default function VideoPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(isLoading);
  const video = useSelector(videoInfo);
  const genresObj = useSelector(genresVideos);
  const admin = useSelector(isAdminUser);
  const activeVideo = useSelector(userActiveVideoInfo);
  const params = useParams() as { id: string };
  const id = Number(params.id);

  const duration = video?.duration?.split(':') || [0, 0, 0];

  const [player, setPlayer] = useState<ReactPlayer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [isSeek, setIsSeek] = useState(false);

  useEffect(() => {
    dispatch(fetchVideo(id));
    setPlaying(false);
    setIsSeek(true);
  }, [id]);

  useEffect(() => {
    if (!player) return;
    const video = player.getInternalPlayer();
    if (video && video.oncontextmenu) {
      video.oncontextmenu = () => false;
    }
  }, [player]);

  const handleBuy = () => {
    dispatch(
      setPaymentData({
        data: { target: 'video', id: video.id, projectId: video.project_id },
        price: video.price,
      }),
    );
    history.push(Routes.payment);
  };

  const handleSubscribe = () => {
    history.push(Routes.subscription);
  };

  const handleChoiceGenre = (genre: string) => (ev: any) => {
    ev.preventDefault();
    dispatch(updateFilterVideos({ genre }));
    history.push(Routes.catalog);
  };

  const handleChoiceActor = (actor: string) => (ev: any) => {
    ev.preventDefault();
    dispatch(setSearch(actor));
    dispatch(updateFilterVideos({ actors: actor }));
    history.push(Routes.catalog);
  };

  const handleEdit = () => {
    history.push(`${Routes.editor}/${video.id}`);
  };

  const handleReady = () => {
    console.log('handleReady');
    if (player && isSeek && activeVideo && activeVideo.id == id) {
      player.seekTo(activeVideo.time);
      setIsSeek(false);
    }
  };

  const handleProgress = ({ playedSeconds }: Progress) => {
    if (playing) dispatch(saveTimeVideo(playedSeconds));
  };

  const handleSeek = (seconds: number) => {
    if (playing) dispatch(saveTimeVideo(seconds));
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    dispatch(saveTimeVideo(player?.getCurrentTime()));
    setPlaying(false);
  };

  const handleStop = () => {
    setPlaying(false);
  };

  const handleClickBtnPlay = () => {
    setPlaying(true);
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <GoBack href={Routes.catalog}>Каталог</GoBack>
          <div
            className={`row d-flex justify-content-between ${cls.wrapperBlockVideo}`}
          >
            <div className={`col-12 col-lg-7 ${cls.blockVideo}`}>
              <div className={cls.previewVideo}>
                {/*<Player poster={video.image || images[video.id]}>*/}
                {/*  <source*/}
                {/*    src={video.paid ? video.video_url : video.preview_video}*/}
                {/*  />*/}
                {/*</Player>*/}
                <ReactPlayer
                  ref={setPlayer}
                  url={video.paid ? video.video_url : video.preview_video}
                  // url={testVideo}
                  width='100%'
                  height='100%'
                  controls
                  progressInterval={intervalSave}
                  config={{
                    file: {
                      attributes: {
                        poster: video.image,
                        controlsList: 'nodownload',
                        oncontextmenu: 'return false;',
                      },
                    },
                  }}
                  playing={playing}
                  onReady={handleReady}
                  onProgress={handleProgress}
                  onSeek={handleSeek}
                  onPlay={handlePlay}
                  onPause={handlePause}
                />
                {/*{!playing && (*/}
                {/*  <Play*/}
                {/*    className={cls.btnPlay}*/}
                {/*    size={70}*/}
                {/*    onClick={handleClickBtnPlay}*/}
                {/*  />*/}
                {/*)}*/}
              </div>
            </div>
            <div
              className={`col-12 col-lg-5 d-flex flex-column justify-content-evenly ${cls.videoInfo}`}
            >
              <h2 className={cls.title}>{video.title}</h2>
              <p className={cls.descriptionN}>
                “Мечты сбываются! Сама эта мысль помогает нам пережить сложные
                времена. А что, если эти мечты недостижимы? Что, если они о
                любви, которая утрачена навек? И ничего уже нельзя изменить,
                ведь вас разделяет не время или расстояние, а другие измерения
                между жизнью и смертью.”
              </p>
              <div className={cls.duePersonal}>
                <p className={cls.duePersonalText}>
                  Пьеса: <span className={cls.duePersonalValue}>Клим</span>
                </p>
                <p className={cls.duePersonalText}>
                  Режиссер:{' '}
                  <span className={cls.duePersonalValue}>Алексей Райт</span>
                </p>
              </div>
              <div className={cls.btnPayment}>
                {!video.paid && !admin && (
                  <ButtonLine
                    className={cls.button}
                    size='big'
                    onClick={handleBuy}
                  >
                    Купить за {video.price} грн
                  </ButtonLine>
                )}

                {!admin && (
                  <Button
                    className={cls.button}
                    size='big'
                    onClick={handleSubscribe}
                  >
                    Оформить подписку
                  </Button>
                )}

                {admin && (
                  <Button
                    className={cls.button}
                    size='big'
                    onClick={handleEdit}
                  >
                    Редактировать Видео
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className={`row ${cls.descriptionVideo}`}>
            <div className={`col-12 col-xl-6 ${cls.description}`}>
              <strong>Описание</strong>
              <ClampLines
                className={cls.over}
                id={video.id?.toString()}
                text={video.description || ''}
                lines={5}
                moreText='Развернуть'
                lessText='Свернуть'
                innerElement='p'
              />
            </div>
            <div className={`col-6 col-md-4 col-xl-2 ${cls.genre}`}>
              <strong>Жанр</strong>
              {video.genre?.map((genreName) => (
                <p className={cls.descriptionItem}>
                  <OverlayTrigger
                    overlay={
                      <Tooltip id={`tooltip-${genreName}`}>
                        Показать все спектакли жанра {genresObj[genreName]}
                      </Tooltip>
                    }
                  >
                    <a href='#' onClick={handleChoiceGenre(genreName)}>
                      {genresObj[genreName]}
                    </a>
                  </OverlayTrigger>
                </p>
              ))}
            </div>
            <div className={`col-6 col-md-4 col-xl-2 ${cls.duration}`}>
              <strong>Длительность</strong>
              <p>
                {+duration[0] || 0} ч {+duration[1] || 0} мин
              </p>
            </div>
            <div className={`col-12 col-md-4 col-xl-2 ${cls.cast}`}>
              <strong>В ролях</strong>
              <ul>
                {video?.actors?.split(',').map((actor) => (
                  <li>
                    <p className={cls.descriptionItem}>
                      <OverlayTrigger
                        overlay={
                          <Tooltip id={`tooltip-${actor}`}>
                            Показать все спектакли с актером {actor.trim()}
                          </Tooltip>
                        }
                      >
                        <a href='#' onClick={handleChoiceActor(actor)}>
                          {actor.trim()}
                        </a>
                      </OverlayTrigger>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={cls.sliders}>
            <div className='row'>
              <h2 className={cls.sliderTitle}>Что еще посмотреть</h2>
            </div>
            <VideoSlider />
          </div>
        </>
      )}
    </div>
  );
}
