import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from './store';
import { Video } from '../common/interfaces/VideoInterface';
import { FilterResponse, getAllVideos } from '../api/services/videoService';
import { showNoticeError } from './notificationSlice';

interface CatalogState {
  isLoading: boolean;
  isNextLoading: boolean;
  videos: Video[];
  count: number;
  genres: { [index: string]: string };
  search: string;
  filter: FilterResponse;
}

const initialState: CatalogState = {
  isLoading: false,
  isNextLoading: false,
  videos: [],
  count: 0,
  // genres: [],
  genres: {},
  search: '',
  filter: {
    limit: 10,
    genre: '',
    // search: '',
  },
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
    setGenres: (state, action: PayloadAction<{ [index: string]: string }>) => {
      state.genres = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
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
  setGenres,
  setSearch,
  setFilter,
} = catalogSlice.actions;

export const fetchVideos = (filter?: FilterResponse): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setIsLoading(true));
  const filterState = getState().catalog.filter;
  const response = await getAllVideos({ ...filterState, ...filter });
  if (response?.error) {
    dispatch(showNoticeError(response.error.message));
    console.error('???????????????? ?????? ?????????????????? ????????????????: ', response.error);
  } else {
    dispatch(setVideos(response.results));
    dispatch(setCount(response.count));
    const genres: { [index: string]: string } = {};
    for (let genre of response.genre) {
      genres[genre[0]] = genre[1];
    }
    dispatch(setGenres(genres));
  }
  dispatch(setIsLoading(false));
};

export const fetchNextVideos = (filter?: FilterResponse): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setIsNextLoading(true));
  const filterState = getState().catalog.filter;
  const response = await getAllVideos({
    ...filterState,
    ...filter,
    offset: getState().catalog.videos.length,
  });
  if (response?.error) {
    dispatch(showNoticeError(response.error.message));
    console.error('???????????????? ?????? ?????????????????? ????????????????: ', response.error);
  } else {
    dispatch(addVideos(response.results));
  }
  dispatch(setIsNextLoading(false));
};

export const updateFilterVideos = (filter: FilterResponse): AppThunk => async (
  dispatch,
) => {
  dispatch(setFilter(filter));
  dispatch(fetchVideos());
};

export const updateSearchVideos = (search: string): AppThunk => async (
  dispatch,
) => {
  dispatch(updateFilterVideos({ title: search, actors: search }));
};

export const isLoading = (state: RootState) => state.catalog.isLoading;
export const allVideos = (state: RootState) => state.catalog.videos;
export const countVideos = (state: RootState) => state.catalog.count;
export const genresVideos = (state: RootState) => state.catalog.genres;
export const searchVideos = (state: RootState) => state.catalog.search;
export const filterVideos = (state: RootState) => state.catalog.filter;

export default catalogSlice.reducer;
