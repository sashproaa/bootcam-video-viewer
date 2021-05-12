import React, { useState } from 'react';

import Form from '../Form';
import { fetchRegistration } from '../../store/registrationSlice';
import { useDispatch } from 'react-redux';

const initialState = {
  email: '',
  password: '',
  loggedIn: false,
};

const Registration = () => {
  const [registration, setRegistration] = useState({ ...initialState });
  const dispatch = useDispatch();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setRegistration((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchRegistration({ email, password }));

    setRegistration({ ...initialState });
  };

  const { email, password, loggedIn } = registration;
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

export default Registration;
