import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';

interface VideoState {
  id: string;
  name: string;
}

const initialState: VideoState = {
  id: '',
  name: '',
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
});

export const {} = videoSlice.actions;

export const id = (state: RootState) => state.video.id;
export const name = (state: RootState) => state.video.name;

export default videoSlice.reducer;
