import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';

interface NoticeState {
  text: string;
  isShow?: boolean;
  status: 'error' | 'success' | 'info' | '';
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
    setStatus: (
      state,
      action: PayloadAction<'error' | 'success' | 'info' | ''>,
    ) => {
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

export const showNotice = ({
  text,
  status,
  isShow = true,
}: NoticeState): AppThunk => (dispatch) => {
  dispatch(setText(text));
  dispatch(setStatus(status));
  dispatch(setIsShow(isShow));
};

export const showNoticeError = (text: string): AppThunk => (dispatch) => {
  dispatch(showNotice({ text, status: 'error' }));
};

export const showNoticeSuccess = (text: string): AppThunk => (dispatch) => {
  dispatch(showNotice({ text, status: 'success' }));
};

export const showNoticeInfo = (text: string): AppThunk => (dispatch) => {
  dispatch(showNotice({ text, status: 'info' }));
};

export const text = (state: RootState) => state.notification.text;
export const isShow = (state: RootState) => state.notification.isShow;
export const status = (state: RootState) => state.notification.text;

export default noticeSlice.reducer;
