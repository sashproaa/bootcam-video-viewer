import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../../store/userSlice';
import Form from '../Form';

interface State {
  email: string;
  password: string;
  loggedIn: boolean;
}

const initialState: State = {
  email: '',
  password: '',
  loggedIn: true,
};

const Login = () => {
  const [login, setLogin] = useState({ ...initialState });
  const dispatch = useDispatch();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchLogin({ email, password }));
    setLogin({ ...initialState });
  };

  const { email, password, loggedIn } = login;

  return (
    <Form
      email={email}
      password={password}
      loggedIn={loggedIn}
      changeInput={onChangeInput}
      changeSubmit={onChangeSubmit}
    />
  );
};

export default Login;
