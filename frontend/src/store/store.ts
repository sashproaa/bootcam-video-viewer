import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import videoReducer from './videoSlice';
import catalogReducer from './catalogSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer,
    catalog: catalogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
