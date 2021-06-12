import webApi from '../webApiHelper';
import { Video } from '../../common/interfaces/VideoInterface';
import { Endpoints } from '../../common/enums/EndpointsEnum';
import { FetchError } from '../../common/interfaces/FetchErrorInterface';

const endpoint = Endpoints.video;

interface VideoRequest extends Video {}

interface VideoResponse extends Video {
  error?: FetchError;
}

export interface VideoAllResponse {
  count: number;
  genre: [string, string][];
  results: Video[];
  error?: FetchError;
}

export interface FilterResponse {
  offset?: number;
  limit?: number;
  title?: string;
  genre?: string;
  actors?: string;
  price?: string;
}

export type GenresResponse = [string, string][];

export const getAllVideos = async (
  filter?: FilterResponse,
): Promise<VideoAllResponse> => {
  return await webApi.get(`${endpoint}/list/`, filter || {});
};

export const getVideo = async (id: number): Promise<VideoResponse> => {
  return await webApi.get(`${endpoint}/${id}`);
};

export const addVideo = async (request: Video): Promise<VideoResponse> => {
  return await webApi.formPost(`${endpoint}/${request.id}`, request);
};

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

export const getAllContentVideos = async (
  filter?: FilterResponse,
): Promise<VideoAllResponse> => {
  return await webApi.get(`${endpoint}/content/list/`, filter || {});
};
