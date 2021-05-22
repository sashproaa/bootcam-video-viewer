import webApi from '../webApiHelper';
import { Video } from '../../common/interfaces/VideoInterface';
import { timeoutMock } from './timeoutMock';
import { videoMock } from './videoMock';
import { videoAllMock } from './videoAllMock';
import { Endpoints } from '../../common/enums/EndpointsEnum';

const endpoint = Endpoints.video;

interface VideoRequest extends Video {}

interface VideoResponse extends Video {
  error?: string;
}

export interface VideoAllResponse {
  count: number;
  videos: Video[];
  genres: string[];
  error?: string;
}

export interface FilterResponse {
  from?: number;
  limit?: number;
  title?: string;
  genre?: string;
}

export const getAllVideos = async (
  filter?: FilterResponse,
): Promise<VideoAllResponse> => {
  // return await webApi.get(`${endpoint}/list`, filter||{});
  return await timeoutMock(videoAllMock());
};

export const getVideo = async (id: number): Promise<VideoResponse> => {
  // return await webApi.get(`${endpoint}/${id}`);
  return await timeoutMock(videoMock());
};

export const addVideo = async (
  request: VideoRequest,
): Promise<VideoResponse> => {
  // return await webApi.post(endpoint, request);
  return await timeoutMock(videoMock());
};

export const updateVideo = async (request: Video): Promise<VideoResponse> => {
  // return await webApi.put(`${endpoint}/${request.id}`, request);
  return await timeoutMock(videoMock());
};

export const deleteVideo = async (id: number): Promise<void> => {
  // return await webApi.delete(`${endpoint}/${id}`);
  return await timeoutMock(null);
};
