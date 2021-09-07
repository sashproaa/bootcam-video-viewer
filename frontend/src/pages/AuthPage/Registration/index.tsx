import React, { useEffect, useState } from 'react';

import { RegistrationData } from '../../../store/userSlice';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Privacy from '../../../components/Privacy';

import cls from './style.module.css';

interface Props {
  onRegistration: (data: RegistrationData) => void;
}

export default function Registration({ onRegistration }: Props) {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  useEffect(() => {}, []);

  const handleChangeValue = (ev: any) => {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = () => {
    onRegistration(values);
  };

  const handleOpenPrivacy = (ev: any) => {
    ev.preventDefault();
    setShowPrivacy(true);
  };

  const handleClosePrivacy = () => {
    setShowPrivacy(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          fill
          // type='email'
          placeholder='Электронная почта'
          name='email'
          value={values.email}
          errorText={errors.email}
          onChange={handleChangeValue}
        />
        <Input
          className={cls.inputLast}
          fill
          type='password'
          placeholder='Пароль'
          name='password'
          value={values.password}
          errorText={errors.password}
          onChange={handleChangeValue}
        />
        <p className={cls.contract}>
          Регистрируя новый профиль, вы принимаете условия{' '}
          <a href='#' onClick={handleOpenPrivacy}>
            Пользовательского соглашения
          </a>
        </p>
        <Button fill type='submit'>
          Зарегистрироваться
        </Button>
      </form>
      <Privacy show={showPrivacy} onClose={handleClosePrivacy} />
    </>
  );
}
