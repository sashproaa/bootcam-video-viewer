import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';

interface CatalogState {
  videos: [];
}

const initialState: CatalogState = {
  videos: [],
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
});

export const {} = catalogSlice.actions;

export const videos = (state: RootState) => state.catalog.videos;

export default catalogSlice.reducer;
