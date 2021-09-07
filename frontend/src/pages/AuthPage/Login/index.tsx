import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  isSaveToken,
  LoginData,
  toggleIsSaveToken,
} from '../../../store/userSlice';
import Checkbox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import cls from './style.module.css';

interface Props {
  onLogin: (data: LoginData) => void;
  onRecovery: () => void;
}

export default function Login({ onLogin, onRecovery }: Props) {
  const dispatch = useDispatch();
  const isSave = useSelector(isSaveToken);
  const [values, setValues] = useState({ email: '', password: '' });

  useEffect(() => {}, []);

  const handleChangeValue = (ev: any) => {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  };

  const handleRemember = () => {
    dispatch(toggleIsSaveToken());
  };

  const handleRecovery = (ev: any) => {
    ev.preventDefault();
    onRecovery();
  };

  const handleSubmit = () => {
    onLogin(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          fill
          type='text'
          placeholder='Электронная почта'
          name='email'
          value={values.email}
          onChange={handleChangeValue}
        />
        <Input
          className={cls.inputLast}
          fill
          type='password'
          placeholder='Пароль'
          name='password'
          value={values.password}
          onChange={handleChangeValue}
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
