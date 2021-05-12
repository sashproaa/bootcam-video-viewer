import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
import { User } from '../common/interfaces/UserInterface';
import { getVideo } from '../api/services/videoService';
import { setVideo } from './videoSlice';
import { getUser } from '../api/services/userService';
import { loginUser } from '../api/services/loginService';

interface UserState {
  isLoading: boolean;
  user: User;
}

const initialState: UserState = {
  isLoading: false,
  user: {} as User,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setIsLoading, setUser } = userSlice.actions;

interface Registration {
  email: string;
  password: string;
}

export const fetchLogin = ({
  email,
  password,
}: Registration): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  const response = await loginUser({ email, password });
  console.log(response);
  if (response?.error) {
    console.log('Проблемы при логине');
  } else {
    dispatch(setUser(response));
  }
  dispatch(setIsLoading(false));
};

export const fetchUser = (id: number): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  const response = await getUser(id);
  if (response?.error) {
    console.log('Проблемы при получении пользователя');
  } else {
    dispatch(setUser(response));
  }
  dispatch(setIsLoading(false));
};

export const isLoading = (state: RootState) => state.user.isLoading;
export const userInfo = (state: RootState) => state.user.user;

export default userSlice.reducer;
