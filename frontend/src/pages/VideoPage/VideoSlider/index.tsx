import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { allVideos, fetchVideos } from '../../../store/catalogSlice';
import { Routes } from '../../../common/enums/RoutesEnum';

export default function VideoSlider() {
  const dispatch = useDispatch();
  const videos = useSelector(allVideos);

  useEffect(() => {
    dispatch(fetchVideos({ limit: 10 }));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {videos.map((vd) => (
        <div key={vd.id}>
          <Link to={`${Routes.video}/${vd.id}`}>
            <img src={vd.image} alt={vd.title} />
          </Link>
        </div>
      ))}
    </Slider>
  );
}
