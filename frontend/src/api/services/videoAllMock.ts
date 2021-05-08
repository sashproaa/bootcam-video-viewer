import { videoMock } from './videoMock';
import { Video } from '../../common/interfaces/VideoInterface';

const countVideo = 6;
const videos: Video[] = [];

for (let i = 0; i < countVideo; i++) {
  videos.push(videoMock());
}

export const videoAllMock = {
  count: countVideo,
  videos,
  genres: videos.map((video) => video.genre),
};
