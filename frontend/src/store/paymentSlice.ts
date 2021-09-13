import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from './store';
import { Transaction } from '../common/interfaces/TransactionInterface';
import { getAllTransactions } from '../api/services/paymentService';
import { showNoticeError } from './notificationSlice';

export interface MerchantData {
  target: 'video' | 'subscription';
  id: number;
  userId: number;
  projectId: number;
  name: string;
  targetName: string;
}

interface CatalogState {
  isLoading: boolean;
  merchantData: MerchantData | null;
  price: string | null;
  history: Transaction[];
}

const initialState: CatalogState = {
  isLoading: false,
  merchantData: null,
  price: null,
  history: [],
};

export const catalogSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMerchantData: (state, action: PayloadAction<MerchantData>) => {
      state.merchantData = action.payload;
    },
    setPrice: (state, action: PayloadAction<string>) => {
      state.price = action.payload;
    },
    setHistory: (state, action: PayloadAction<Transaction[]>) => {
      state.history = action.payload;
    },
    cleanPaymentData: () => {
      return initialState;
    },
  },
});

export const {
  setIsLoading,
  setMerchantData,
  setPrice,
  setHistory,
  cleanPaymentData,
} = catalogSlice.actions;

export const setPaymentData = ({
  data,
  price,
}: {
  data: Omit<MerchantData, 'userId'>;
  price: string;
}): AppThunk => async (dispatch, getState) => {
  const userId = getState().user.user.id;
  dispatch(setPrice(price));
  dispatch(setMerchantData({ ...data, userId }));
};

export const updatePaymentUserId = (): AppThunk => async (
  dispatch,
  getState,
) => {
  const userId = getState().user.user.id;
  const merchantData = getState().payment.merchantData;
  if (merchantData) dispatch(setMerchantData({ ...merchantData, userId }));
};

export const fetchHistoryTransactions = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  const response = await getAllTransactions();
  if (response?.error) {
    dispatch(showNoticeError(response.error.message));
    console.error('Проблемы при получении транзакций: ', response.error);
  } else {
    dispatch(setHistory(response.results));
  }
  dispatch(setIsLoading(false));
};

export const isLoading = (state: RootState) => state.payment.isLoading;
export const merchantDataState = (state: RootState) =>
  state.payment.merchantData;
export const priceState = (state: RootState) => state.payment.price;
export const historyTransactions = (state: RootState) => state.payment.history;

export default catalogSlice.reducer;
