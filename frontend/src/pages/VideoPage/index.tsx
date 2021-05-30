import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import { fetchVideo, isLoading, videoInfo } from '../../store/videoSlice';
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

export default function VideoPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(isLoading);
  const video = useSelector(videoInfo);
  const params = useParams() as { id: string };
  const id = Number(params.id);

  const duration = video?.duration?.split(':') || [0, 0, 0];

  useEffect(() => {
    dispatch(fetchVideo(id));
  }, []);

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
                <Player poster={video.image || images[video.id]}>
                  <source
                    src={
                      video.url ||
                      'https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
                    }
                  />
                </Player>
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
                <ButtonLine
                  className={cls.button}
                  size='big'
                  onClick={handleBuy}
                >
                  Купить за {video.price} грн
                </ButtonLine>
                <Button
                  className={cls.button}
                  size='big'
                  onClick={handleSubscribe}
                >
                  Оформить подписку
                </Button>
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
              <p>мелодрамма</p>
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
                    <p>{actor.trim()}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
