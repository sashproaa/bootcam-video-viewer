import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
import { User } from '../common/interfaces/UserInterface';
import { getVideo } from '../api/services/videoService';
import { setVideo } from './videoSlice';
import { getUser } from '../api/services/userService';

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

export const userInfo = (state: RootState) => state.user.user;

export default userSlice.reducer;
