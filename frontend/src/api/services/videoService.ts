import webApi from '../webApiHelper';
import { Video } from '../../common/interfaces/VideoInterface';
import { Endpoints } from '../../common/enums/EndpointsEnum';

const endpoint = Endpoints.video;

interface VideoRequest extends Video {}

interface VideoResponse extends Video {
  error?: string;
}

export interface VideoAllResponse {
  count: number;
  genre: [string, string][];
  results: Video[];
  error?: string;
}

export interface FilterResponse {
  offset?: number;
  limit?: number;
  search?: string;
  genre?: string;
}

export type GenresResponse = [string, string][];

export const getAllVideos = async (
  filter?: FilterResponse,
): Promise<VideoAllResponse> => {
  return await webApi.get(`${endpoint}/list/`, filter || {});
  // return await timeoutMock(videoAllMock());
};

export const getVideo = async (id: number): Promise<VideoResponse> => {
  return await webApi.get(`${endpoint}/${id}`);
  // return await timeoutMock(videoMock());
};

export const addVideo = async (request: Video): Promise<VideoResponse> => {
  return await webApi.formPost(`${endpoint}/${request.id}`, request);
  // return await timeoutMock(videoMock());
};

// export const updateVideo = async (request: Video): Promise<VideoResponse> => {
//   return await webApi.put(`${endpoint}/${request.id}`, request);
//   // return await timeoutMock(videoMock());
// };

export const updateVideo = async (request: Video): Promise<VideoResponse> => {
  return await webApi.patchh(`${endpoint}/${request.id}`, request);
};

export const updateMedia = async (request: Video): Promise<VideoResponse> => {
  return await webApi.formPatch(`${endpoint}/${request.id}`, request);
};

export const deleteVideo = async (id: number): Promise<void> => {
  return await webApi.delete(`${endpoint}/${id}`);
};

export const getGenres = async (): Promise<GenresResponse> => {
  const res = await webApi.get(`${endpoint}/list/`, { limit: 1 });
  return res.genre;
};
