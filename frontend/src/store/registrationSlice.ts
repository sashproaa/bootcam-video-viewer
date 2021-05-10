import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
import { registrationUser } from './../api/services/registrationService';

interface registrationState {
  isLoading: boolean;
  email: string;
  name: string;
  token: string;
}

const initialState: registrationState = {
  isLoading: false,
  email: '',
  name: '',
  token: '',
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

interface Registration {
  name: string;
  email: string;
  password: string;
}

export const {
  setIsLoading,
  setEmail,
  setName,
  setToken,
} = registrationSlice.actions;

export const fetchRegistration = ({
  name,
  email,
  password,
}: Registration): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));

  const response = await registrationUser({ name, email, password });

  if (response?.error) {
    console.log('Проблемы при регистрации');
  } else {
    console.log(response.email);
    dispatch(setEmail(response.email));
    dispatch(setName(response.name));
    dispatch(setToken(response.token));
  }
  dispatch(setIsLoading(false));
};

export const isLoading = (state: RootState) => state.registration.isLoading;
export const emailUser = (state: RootState) => state.registration.email;
export const nameUser = (state: RootState) => state.registration.name;
export const token = (state: RootState) => state.registration.token;

export default registrationSlice.reducer;
