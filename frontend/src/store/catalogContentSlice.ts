import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
import { Video } from '../common/interfaces/VideoInterface';
import {
  FilterResponse,
  getAllContentVideos,
  getAllVideos,
} from '../api/services/videoService';
import { showNoticeError } from './notificationSlice';

interface CatalogContentState {
  isLoading: boolean;
  isNextLoading: boolean;
  videos: Video[];
  count: number;
  filter: FilterResponse;
}

const initialState: CatalogContentState = {
  isLoading: false,
  isNextLoading: false,
  videos: [],
  count: 0,
  filter: {
    limit: 10,
  },
};

export const catalogContentSlice = createSlice({
  name: 'catalogContent',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsNextLoading: (state, action: PayloadAction<boolean>) => {
      state.isNextLoading = action.payload;
    },
    setVideos: (state, action: PayloadAction<Video[]>) => {
      state.videos = action.payload;
    },
    addVideos: (state, action: PayloadAction<Video[]>) => {
      state.videos.push(...action.payload);
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setFilter: (state, action: PayloadAction<FilterResponse>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const {
  setIsLoading,
  setIsNextLoading,
  setVideos,
  addVideos,
  setCount,
  setFilter,
} = catalogContentSlice.actions;

export const fetchVideos = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const filterState = getState().catalog.filter;
  const response = await getAllContentVideos(filterState);
  if (response?.error) {
    dispatch(showNoticeError(response.error.message));
    console.error('Проблемы при получении каталога: ', response.error);
  } else {
    dispatch(setVideos(response.results));
    dispatch(setCount(response.count));
  }
  dispatch(setIsLoading(false));
};

export const fetchNextVideos = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsNextLoading(true));
  const filterState = getState().catalog.filter;
  const response = await getAllVideos({
    ...filterState,
    offset: getState().catalogContent.videos.length,
  });
  if (response?.error) {
    dispatch(showNoticeError(response.error.message));
    console.error('Проблемы при получении каталога: ', response.error);
  } else {
    dispatch(addVideos(response.results));
  }
  dispatch(setIsNextLoading(false));
};

export const isLoading = (state: RootState) => state.catalogContent.isLoading;
export const allVideos = (state: RootState) => state.catalogContent.videos;
export const countVideos = (state: RootState) => state.catalogContent.count;

export default catalogContentSlice.reducer;
