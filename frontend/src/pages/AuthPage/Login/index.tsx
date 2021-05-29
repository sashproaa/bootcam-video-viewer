import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginData } from '../../../store/userSlice';
import { IoCheckmark } from 'react-icons/io5';
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
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const [isRemember, setIsRemember] = useState(true);

  useEffect(() => {}, []);

  // const handleRegistration = () => {
  //   onChangeType('registration');
  // };

  const handleRemember = () => {
    setIsRemember(!isRemember);
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
              checked={isRemember}
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
