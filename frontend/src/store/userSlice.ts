import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from './store';
import { User } from '../common/interfaces/UserInterface';
import {
  addUser,
  changePassword,
  getUser,
  loginUser,
  logoutUser,
  updateMedia,
  updateUser,
  UserMediaRequest,
} from '../api/services/userService';
import { clearToken, getToken, setToken } from '../common/helpers/tokenHelper';
import { showNoticeError, showNoticeSuccess } from './notificationSlice';

export interface RegistrationData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  new_password1: string;
  new_password2: string;
}

interface UserState {
  isLoading: boolean;
  isShowAuth: boolean;
  user: User;
  isAdmin: boolean;
  isSaveToken: boolean;
}

const initialState: UserState = {
  isLoading: false,
  isShowAuth: false,
  user: {} as User,
  isAdmin: false,
  isSaveToken: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsShowAuth: (state, action: PayloadAction<boolean>) => {
      state.isShowAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
    setIsSaveToken: (state, action: PayloadAction<boolean>) => {
      state.isSaveToken = action.payload;
    },
    toggleIsSaveToken: (state) => {
      state.isSaveToken = !state.isSaveToken;
    },
    setActiveVideo: (
      state,
      action: PayloadAction<{ id: number; time: number }>,
    ) => {
      if (state.user.history) state.user.history.activeVideo = action.payload;
    },
    // updateViewedVideos: (state, action: PayloadAction<{id:number; time: number}>) => {
    //   state.isSaveToken = !state.isSaveToken;
    // },
    clearUser: () => {
      return initialState;
    },
  },
});

export const {
  setIsLoading,
  setIsShowAuth,
  setUser,
  setIsAdmin,
  setIsSaveToken,
  toggleIsSaveToken,
  setActiveVideo,
  clearUser,
} = userSlice.actions;

export const fetchUser = (): AppThunk => async (dispatch) => {
  if (!getToken()) return;
  dispatch(setIsLoading(true));
  const response = await getUser();
  if (response?.error) {
    dispatch(showNoticeError(response.error.message));
    console.error('Проблемы при получении пользователя: ', response.error);
  } else {
    // dispatch(setUser(response));
    dispatch(setUser(response));
    dispatch(setIsAdmin(response.is_staff || response.is_superUser));
    dispatch(setIsShowAuth(false));
  }
  dispatch(setIsLoading(false));
};

export const fetchLoginUser = (data: LoginData): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setIsLoading(true));
  const response = await loginUser(data);
  if (response?.error) {
    dispatch(showNoticeError(response.error.message));
    console.error('Проблемы при логине: ', response.error);
  } else {
    setToken(response.key, getState().user.isSaveToken);
    dispatch(fetchUser());
  }
  dispatch(setIsLoading(false));
};

export const fetchRegistrationUser = (
  data: RegistrationData,
): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  const response = await addUser({
    email: data.email,
    password1: data.password,
    password2: data.password,
  });
  if (response?.error) {
    dispatch(showNoticeError(response.error.message));
    console.error('Проблемы при регистрации: ', response.error);
  } else {
    dispatch(fetchLoginUser({ email: data.email, password: data.password }));
  }
  dispatch(setIsLoading(false));
};

export const fetchLogoutUser = (): AppThunk => async (dispatch) => {
  logoutUser();
  clearToken();
  dispatch(clearUser());
};

export const fetchUpdateUser = (data: User): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  const response = await updateUser(data);
  if (response?.error) {
    dispatch(showNoticeError(response.error.message));
    console.error('Проблемы при обновлении пользователя: ', response.error);
  } else {
    dispatch(fetchUser());
    dispatch(showNoticeSuccess('Профиль обновлен.'));
  }
  dispatch(setIsLoading(false));
};

export const fetchChangePassword = (
  data: ChangePasswordData,
): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  const response = await changePassword(data);
  if (response?.error) {
    dispatch(showNoticeError(response.error.message));
    console.error('Проблемы при изменении пароля: ', response.error);
  } else {
    // dispatch(fetchUser());
    dispatch(showNoticeSuccess('Пароль изменён.'));
  }
  dispatch(setIsLoading(false));
};

export const fetchUpdateAvatar = (file: Blob): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  const response = await updateMedia({
    avatar: file,
  } as UserMediaRequest);
  if (response?.error) {
    dispatch(showNoticeError(response.error.message));
    console.error('Проблемы при изменении аватара: ', response.error);
  } else {
    // dispatch(fetchUser());
    dispatch(showNoticeSuccess('Аватар изменён.'));
  }
  dispatch(setIsLoading(false));
};

export const updateActiveVideo = (activeVideo: {
  id: number;
  time: number;
}): AppThunk => async (dispatch, getState) => {
  dispatch(setActiveVideo(activeVideo));
  if (getState().user.user.id) {
    const response = await updateUser({
      history: {
        activeVideo,
      },
    } as User);
  }
};

export const isLoading = (state: RootState) => state.user.isLoading;
export const isShowAuth = (state: RootState) => state.user.isShowAuth;
export const userInfo = (state: RootState) => state.user.user;
export const userActiveVideoInfo = (state: RootState) =>
  state.user.user.history?.activeVideo;
export const isAdminUser = (state: RootState) => state.user.isAdmin;
export const isSaveToken = (state: RootState) => state.user.isSaveToken;

export default userSlice.reducer;
