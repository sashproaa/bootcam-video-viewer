import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';

interface NoticeState {
  text: string;
  isShow: boolean;
  status: string;
}

const initialState: NoticeState = {
  text: '',
  isShow: false,
  status: '',
};

export const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setIsShow: (state, action: PayloadAction<boolean>) => {
      state.isShow = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    clearNotice: (state) => ({
      text: '',
      isShow: false,
      status: '',
    }),
  },
});

export const {
  setText,
  setIsShow,
  setStatus,
  clearNotice,
} = noticeSlice.actions;

export const showNotice = ({ text, isShow, status }: NoticeState): AppThunk => (
  dispatch,
) => {
  dispatch(setIsShow(isShow));
  dispatch(setText(text));
  dispatch(setStatus(status));
};

export const text = (state: RootState) => state.notification.text;
export const isShow = (state: RootState) => state.notification.isShow;
export const status = (state: RootState) => state.notification.text;

export default noticeSlice.reducer;
