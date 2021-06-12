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
import { updateUser } from '../api/services/userService';
import { User } from '../common/interfaces/UserInterface';
import { updateActiveVideo } from './userSlice';

interface VideoState {
  isLoading: boolean;
  video: Video;
  timeVideo: number | undefined;
}

const initialState: VideoState = {
  isLoading: false,
  video: {} as Video,
  timeVideo: 0,
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
    setTimeVideo: (state, action: PayloadAction<number | undefined>) => {
      state.timeVideo = action.payload;
    },
  },
});

export const { setIsLoading, setVideo, setTimeVideo } = videoSlice.actions;

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

export const saveTimeVideo = (time: number | undefined): AppThunk => async (
  dispatch,
  getState,
) => {
  const timeNum = time ? time : 0;
  dispatch(setTimeVideo(timeNum));
  if (getState().video.video.video_url) {
    dispatch(
      updateActiveVideo({
        id: getState().video.video.id,
        time: timeNum,
      }),
    );
  }
};

export const playVideo = (): AppThunk => async (dispatch, getState) => {};

export const pauseVideo = (): AppThunk => async (dispatch, getState) => {};

export const stopVideo = (): AppThunk => async (dispatch, getState) => {};

export const isLoading = (state: RootState) => state.video.isLoading;
export const videoInfo = (state: RootState) => state.video.video;

export default videoSlice.reducer;
