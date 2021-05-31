import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
import { User } from '../common/interfaces/UserInterface';
import { getVideo } from '../api/services/videoService';
import { setVideo } from './videoSlice';
import {
  addUser,
  getUser,
  loginUser,
  logoutUser,
} from '../api/services/userService';
import Registration from '../pages/AuthPage/Registration';
import Login from '../pages/AuthPage/Login';
import { clearToken, getToken, setToken } from '../common/helpers/tokenHelper';

export interface RegistrationData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

interface UserState {
  isLoading: boolean;
  isShowAuth: boolean;
  user: User;
}

const initialState: UserState = {
  isLoading: false,
  isShowAuth: false,
  user: {} as User,
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
    clearUser: () => {
      return initialState;
    },
  },
});

export const {
  setIsLoading,
  setIsShowAuth,
  setUser,
  clearUser,
} = userSlice.actions;

export const fetchUser = (): AppThunk => async (dispatch) => {
  if (!getToken()) return;
  dispatch(setIsLoading(true));
  const response = await getUser();
  console.log('user res: ', response);
  if (response?.error) {
    console.log('Проблемы при получении пользователя');
  } else {
    // dispatch(setUser(response));
    dispatch(setUser({ ...response, id: 12 }));
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
    console.log('Проблемы при логине');
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
  console.log('reg response: ', response);
  if (response?.error) {
    console.log('Проблемы при регистрации');
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

export const isLoading = (state: RootState) => state.user.isLoading;
export const isShowAuth = (state: RootState) => state.user.isShowAuth;
export const userInfo = (state: RootState) => state.user.user;

export default userSlice.reducer;
