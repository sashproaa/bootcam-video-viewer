import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import videoReducer from './videoSlice';
import catalogReducer from './catalogSlice';
import subscriptionReducer from './subscriptionSlice';
import noticeReducer from './notificationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer,
    catalog: catalogReducer,
    subscription: subscriptionReducer,
    notification: noticeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
