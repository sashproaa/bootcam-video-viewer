import { videoMock } from './videoMock';

const countVideo = 6;
const videos = new Array(countVideo).map(() => videoMock());

export const videoAllMock = {
  count: countVideo,
  videos,
  genres: videos.map((video) => video.genre),
};
