import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginData } from '../../../store/userSlice';
import { IoCheckmark } from 'react-icons/io5';

// interface FormData {
//   email: string;
//   password: string;
// }

interface Props {
  // onChangeType: (type: 'login' | 'registration') => void;
  onLogin: (data: LoginData) => void;
}

export default function Login({ onLogin }: Props) {
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  useEffect(() => {}, []);

  // const handleRegistration = () => {
  //   onChangeType('registration');
  // };

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    onLogin(data);
  };

  return (
    // <div>
    //   <div className='d-flex align-items-center mb-3'>
    //     <h2 className='m-3'>Login</h2>
    //     <button className='btn btn-light' onClick={handleRegistration}>
    //       Registration
    //     </button>
    //   </div>
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <div className='mb-3'>
    //       <label htmlFor='inputEmailL' className='form-label'>
    //         Email address
    //       </label>
    //       <input
    //         type='email'
    //         className='form-control'
    //         id='inputEmailL'
    //         {...register('email', { required: true })}
    //       />
    //       <div id='emailHelpL' className='form-text'>
    //         We'll never share your email with anyone else.
    //       </div>
    //     </div>
    //     <div className='mb-3'>
    //       <label htmlFor='inputPasswordL' className='form-label'>
    //         Password
    //       </label>
    //       <input
    //         type='password'
    //         className='form-control'
    //         id='inputPasswordL'
    //         {...register('password', { required: true })}
    //       />
    //     </div>
    //     <button type='submit' className='btn btn-primary'>
    //       Login
    //     </button>
    //   </form>
    // </div>

    <>
      {/*<div className='header_popUp'>*/}
      {/*  <a href='#'>Вход</a>*/}
      {/*  <a href='#'>Регистрация</a>*/}
      {/*</div>*/}
      <div className='inform'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            placeholder='Электронная почта'
            {...register('email', { required: true })}
          />
          <input
            type='password'
            placeholder='Пароль'
            {...register('password', { required: true })}
          />
          <div className='check'>
            <div className='container-for-checkbox'>
              <label htmlFor='remember'>
                <p>Запомнить меня</p>
                <input type='checkbox' id='remember' />
                <span className='custom-checkbox'>
                  <IoCheckmark className='custom-checkbox-icon' />
                </span>
              </label>
            </div>
            <a href='#'>Забыли пароль?</a>
          </div>
          <button type='submit'>Войти</button>
        </form>
      </div>
    </>
  );
}
