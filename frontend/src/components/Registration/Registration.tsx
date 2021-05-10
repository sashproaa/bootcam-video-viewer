import React, { useState } from 'react';
import Form from '../Form';
import { fetchRegistration } from '../../store/registrationSlice';

const initialState = {
  email: '',
  password: '',
  name: '',
  loggedIn: false,
};

const Registration = () => {
  const [registration, setRegistration] = useState({ ...initialState });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setRegistration((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchRegistration({ email, password, name });

    setRegistration({ ...initialState });
  };

  const { email, password, name, loggedIn } = registration;
  return (
    <Form
      email={email}
      password={password}
      name={name}
      loggedIn={loggedIn}
      changeInput={onChangeInput}
      changeSubmit={onChangeSubmit}
    />
  );
};

export default Registration;
