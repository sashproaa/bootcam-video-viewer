import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
import { User } from '../common/interfaces/UserInterface';
import { getVideo } from '../api/services/videoService';
import { setVideo } from './videoSlice';
import {
  addUser,
  changePassword,
  getUser,
  loginUser,
  logoutUser,
  updateUser,
} from '../api/services/userService';
import Registration from '../pages/AuthPage/Registration';
import Login from '../pages/AuthPage/Login';
import { clearToken, getToken, setToken } from '../common/helpers/tokenHelper';
import ChangePassword from '../pages/ProfilePage/ChangePassword';
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
}

const initialState: UserState = {
  isLoading: false,
  isShowAuth: false,
  user: {} as User,
  isAdmin: false,
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
) => {
  dispatch(setIsLoading(true));
  const response = await loginUser(data);
  if (response?.error) {
    dispatch(showNoticeError(response.error.message));
    console.error('Проблемы при логине: ', response.error);
  } else {
    setToken(response.key);
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

export const isLoading = (state: RootState) => state.user.isLoading;
export const isShowAuth = (state: RootState) => state.user.isShowAuth;
export const userInfo = (state: RootState) => state.user.user;
export const isAdminUser = (state: RootState) => state.user.isAdmin;

export default userSlice.reducer;
