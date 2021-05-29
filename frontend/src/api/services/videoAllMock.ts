import { videoMock } from './videoMock';
import { Video } from '../../common/interfaces/VideoInterface';

const countVideo = 6;

export function videoAllMock() {
  const videos = [];
  for (let i = 0; i < countVideo; i++) {
    videos.push(videoMock());
  }
  return {
    count: countVideo,
    videos,
    genres: videos.map((video) => video.genre),
  };
}
