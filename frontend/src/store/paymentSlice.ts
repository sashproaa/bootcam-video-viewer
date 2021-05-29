import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';

export interface MerchantData {
  target: 'video' | 'subscription';
  id: number;
  userId: number;
  projectId: number;
}

interface CatalogState {
  isLoading: boolean;
  merchantData: MerchantData | null;
  price: string | null;
}

const initialState: CatalogState = {
  isLoading: false,
  merchantData: null,
  price: null,
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
    cleanPaymentData: () => {
      return initialState;
    },
  },
});

export const {
  setIsLoading,
  setMerchantData,
  setPrice,
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

export const isLoading = (state: RootState) => state.payment.isLoading;
export const merchantDataState = (state: RootState) =>
  state.payment.merchantData;
export const priceState = (state: RootState) => state.payment.price;

export default catalogSlice.reducer;
