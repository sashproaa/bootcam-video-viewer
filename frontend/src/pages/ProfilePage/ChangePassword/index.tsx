import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  ChangePasswordData,
  fetchChangePassword,
} from '../../../store/userSlice';
import cls from './style.module.css';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import ModalWin from '../../../components/ModalWin';

interface Props {
  className?: string;
  show: boolean;
  onClose: () => void;
}

export default function ChangePassword({
  className = '',
  show,
  onClose,
}: Props) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordData>();

  const onSubmit: SubmitHandler<ChangePasswordData> = (data) => {
    dispatch(fetchChangePassword(data));
    onClose();
  };

  return (
    <ModalWin show={show} onClose={onClose}>
      <div className={cls.win}>
        <h1 className={cls.winTitle}>Смена пароля</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type='password'
            placeholder='Новый пароль'
            {...register('new_password1', { required: true })}
          />
          <Input
            type='password'
            placeholder='Подтвердите пароль'
            {...register('new_password2', { required: true })}
          />
          <div className={cls.savePass}>
            <Button className={cls.saveBtn} type='submit'>
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </ModalWin>
  );
}
