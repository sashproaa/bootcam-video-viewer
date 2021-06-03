import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
import { Video } from '../common/interfaces/VideoInterface';
import {
  addVideo,
  getVideo,
  updateMedia,
  updateVideo,
} from '../api/services/videoService';
import { showNoticeError } from './notificationSlice';

interface VideoState {
  isLoading: boolean;
  video: Video;
}

const initialState: VideoState = {
  isLoading: false,
  video: {} as Video,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setVideo: (state, action: PayloadAction<Video>) => {
      state.video = action.payload;
    },
  },
});

export const { setIsLoading, setVideo } = videoSlice.actions;

export const fetchVideo = (id: number): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  const response = await getVideo(id);
  if (response?.error) {
    dispatch(showNoticeError(response.error.message));
    console.error('Проблемы при получении видео: ', response.error);
  } else {
    dispatch(setVideo(response));
  }
  dispatch(setIsLoading(false));
};

export const fetchUpdateVideo = (video: Video): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setIsLoading(true));
  const response = await updateVideo({
    ...video,
    id: getState().video.video.id,
  });
  if (response?.error) {
    dispatch(showNoticeError(response.error.message));
    console.error('Проблемы при получении видео: ', response.error);
  } else {
    dispatch(setVideo(response));
  }
  dispatch(setIsLoading(false));
};

export const fetchUpdatMedia = (video: Video): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setIsLoading(true));
  const response = await updateMedia({
    ...video,
    id: getState().video.video.id,
  });
  if (response?.error) {
    dispatch(showNoticeError(response.error.message));
    console.error('Проблемы при получении видео: ', response.error);
  } else {
    dispatch(setVideo(response));
  }
  dispatch(setIsLoading(false));
};

export const isLoading = (state: RootState) => state.video.isLoading;
export const videoInfo = (state: RootState) => state.video.video;

export default videoSlice.reducer;
