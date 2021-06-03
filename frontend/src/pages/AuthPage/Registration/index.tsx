import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegistrationData } from '../../../store/userSlice';
import cls from './style.module.css';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// interface FormData {
//   email: string;
//   password: string;
// }

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

interface Props {
  // onChangeType: (type: 'login' | 'registration') => void;
  onRegistration: (data: RegistrationData) => void;
}

export default function Registration({ onRegistration }: Props) {
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {}, []);

  // const handleLogin = () => {
  //   onChangeType('login');
  // };

  const onSubmit: SubmitHandler<RegistrationData> = (data) => {
    console.log('SubmitHandler: ', data);
    onRegistration(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          fill
          type='email'
          placeholder='Электронная почта'
          {...register('email')}
        />
        <Input
          className={cls.inputLast}
          fill
          type='password'
          placeholder='Пароль'
          {...register('password')}
        />
        <p className={cls.contract}>
          Регистрируя новый профиль, вы принимаете условия
          <a href='#'>Пользовательского соглашения</a>
        </p>
        <Button fill type='submit'>
          Зарегистрироваться
        </Button>
      </form>
    </>
  );
}
