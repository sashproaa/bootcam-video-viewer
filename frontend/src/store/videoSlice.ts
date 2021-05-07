import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
import { Video } from '../common/interfaces/VideoInterface';
import { getVideo } from '../api/services/videoService';

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
    console.log('Проблемы при получении видео');
  } else {
    dispatch(setVideo(response));
  }
  dispatch(setIsLoading(false));
};

export const videoInfo = (state: RootState) => state.video.video;

export default videoSlice.reducer;
