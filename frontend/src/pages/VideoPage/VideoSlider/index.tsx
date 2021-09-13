import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import { Routes } from '../../../common/enums/RoutesEnum';
import {
  FilterResponse,
  getAllVideos,
} from '../../../api/services/videoService';
import { Video } from '../../../common/interfaces/VideoInterface';
import Spinner from '../../../components/Spinner';

import 'slick-carousel/slick/slick.css';
import cls from './style.module.css';
import './style.css';

interface Props {
  className?: string;
  classSlider?: string;
  limit?: number;
  filter?: FilterResponse;
}

export default function VideoSlider({
  className = '',
  classSlider = '',
  limit = 10,
  filter = {},
}: Props) {
  const [videos, setVideos] = useState<Video[] | undefined>();

  useEffect(() => {
    let cleanup = false;

    (async () => {
      const data = await getAllVideos({ ...filter, limit });
      if (!cleanup) setVideos(data.results || []);
    })();

    return () => {
      cleanup = true;
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={className}>
      {!videos ? (
        <Spinner />
      ) : (
        <Slider className={`${cls.slider} ${classSlider}`} {...settings}>
          {videos?.map((video) => (
            <div key={video.id}>
              <div className={cls.slide}>
                <Link className={cls.link} to={`${Routes.video}/${video.id}`}>
                  <div className={cls.wrapImg}>
                    <img
                      className={cls.img}
                      src={video.image}
                      alt={video.title}
                    />
                  </div>
                  <p className={cls.title}>{video.title}</p>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
