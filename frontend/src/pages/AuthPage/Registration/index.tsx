import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegistrationData } from '../../../store/userSlice';

// interface FormData {
//   email: string;
//   password: string;
// }

interface Props {
  onChangeType: (type: 'login' | 'registration') => void;
  onRegistration: (data: RegistrationData) => void;
}

export default function Registration({ onChangeType, onRegistration }: Props) {
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationData>();

  useEffect(() => {}, []);

  const handleLogin = () => {
    onChangeType('login');
  };

  const onSubmit: SubmitHandler<RegistrationData> = (data) => {
    console.log('SubmitHandler: ', data);
    onRegistration(data);
  };

  return (
    <div>
      <div className='d-flex align-items-center mb-3'>
        <h2 className='m-3'>Registration</h2>
        <button className='btn btn-light' onClick={handleLogin}>
          Login
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <label htmlFor='inputEmailR' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='inputEmailR'
            {...register('email', {
              required: true,
              pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            })}
          />
          <div id='emailHelpR' className='form-text'>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='inputPasswordR' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='inputPasswordR'
            {...register('password', { required: true, minLength: 8 })}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Registration
        </button>
      </form>
    </div>
  );
}
