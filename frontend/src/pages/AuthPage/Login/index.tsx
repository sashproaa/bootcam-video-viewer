import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  isSaveToken,
  LoginData,
  toggleIsSaveToken,
} from '../../../store/userSlice';
import Checkbox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import cls from './style.module.css';
import Button from '../../../components/Button';

interface Props {
  onLogin: (data: LoginData) => void;
  onRecovery: () => void;
}

export default function Login({ onLogin, onRecovery }: Props) {
  const dispatch = useDispatch();
  const isSave = useSelector(isSaveToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  useEffect(() => {}, []);

  const handleRemember = () => {
    dispatch(toggleIsSaveToken());
  };

  const handleRecovery = (ev: any) => {
    ev.preventDefault();
    onRecovery();
  };

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    onLogin(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          fill
          type='text'
          placeholder='Электронная почта'
          {...register('email', { required: true })}
        />
        <Input
          className={cls.inputLast}
          fill
          type='password'
          placeholder='Пароль'
          {...register('password', { required: true })}
        />
        <div className={cls.check}>
          <div className='container-for-checkbox'>
            <Checkbox
              label='Запомнить меня'
              checked={isSave}
              onChange={handleRemember}
            />
          </div>
          <a className={cls.forget} href='#' onClick={handleRecovery}>
            Забыли пароль?
          </a>
        </div>
        <Button fill type='submit'>
          Войти
        </Button>
      </form>
    </>
  );
}
