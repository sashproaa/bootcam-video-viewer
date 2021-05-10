import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
import { Video } from '../common/interfaces/VideoInterface';
import { FilterResponse, getAllVideos } from '../api/services/videoService';

interface CatalogState {
  isLoading: boolean;
  isNextLoading: boolean;
  videos: Video[];
  count: number;
  genres: string[];
}

const initialState: CatalogState = {
  isLoading: false,
  isNextLoading: false,
  videos: [],
  count: 0,
  genres: [],
};

export const catalogSlice = createSlice({
  name: 'catalog',
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
    setGenres: (state, action: PayloadAction<string[]>) => {
      state.genres = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setIsNextLoading,
  setVideos,
  addVideos,
  setCount,
  setGenres,
} = catalogSlice.actions;

export const fetchVideos = (filter: FilterResponse): AppThunk => async (
  dispatch,
) => {
  dispatch(setIsLoading(true));
  const response = await getAllVideos(filter);
  if (response?.error) {
    console.log('Проблемы при получении каталога');
  } else {
    dispatch(setVideos(response.videos));
    dispatch(setCount(response.count));
    dispatch(setGenres(response.genres));
  }
  dispatch(setIsLoading(false));
};

export const fetchNextVideos = (filter: FilterResponse): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setIsNextLoading(true));
  const response = await getAllVideos({
    ...filter,
    from: getState().catalog.videos.length,
  });
  if (response?.error) {
    console.log('Проблемы при получении каталога');
  } else {
    dispatch(addVideos(response.videos));
  }
  dispatch(setIsNextLoading(false));
};

export const isLoading = (state: RootState) => state.catalog.isLoading;
export const allVideos = (state: RootState) => state.catalog.videos;
export const countVideos = (state: RootState) => state.catalog.count;
export const genresVideos = (state: RootState) => state.catalog.genres;

export default catalogSlice.reducer;
