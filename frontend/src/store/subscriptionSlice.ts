import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
import { Subscription } from '../common/interfaces/SubscriptionInterface';
import { getAllSubscriptions } from '../api/services/subscriptionService';
import { showNoticeError } from './notificationSlice';

interface CatalogState {
  isLoading: boolean;
  subscriptions: Subscription[];
}

const initialState: CatalogState = {
  isLoading: false,
  subscriptions: [],
};

export const catalogSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSubscriptions: (state, action: PayloadAction<Subscription[]>) => {
      state.subscriptions = action.payload;
    },
  },
});

export const { setIsLoading, setSubscriptions } = catalogSlice.actions;

export const fetchSubscriptions = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  const response = await getAllSubscriptions();
  if (response?.error) {
    dispatch(showNoticeError(response.error.message));
    console.error('Проблемы при получении подписок: ', response.error);
  } else {
    dispatch(setSubscriptions(response.results));
  }
  dispatch(setIsLoading(false));
};

export const isLoading = (state: RootState) => state.subscription.isLoading;
export const allSubscriptions = (state: RootState) =>
  state.subscription.subscriptions;

export default catalogSlice.reducer;
