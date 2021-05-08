import React, { useState } from 'react';
import Form from '../Form/Form';

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

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
