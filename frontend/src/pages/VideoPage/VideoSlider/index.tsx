import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Routes } from '../../../common/enums/RoutesEnum';
import {
  FilterResponse,
  getAllVideos,
} from '../../../api/services/videoService';
import { Video } from '../../../common/interfaces/VideoInterface';
import Spinner from '../../../components/Spinner';

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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className={className}>
      {!videos ? (
        <Spinner />
      ) : (
        <Slider className={classSlider} {...settings}>
          {videos?.map((vd) => (
            <div key={vd.id}>
              <Link to={`${Routes.video}/${vd.id}`}>
                <img src={vd.image} alt={vd.title} />
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
