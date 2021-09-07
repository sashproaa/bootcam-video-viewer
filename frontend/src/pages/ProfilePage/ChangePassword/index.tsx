import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  ChangePasswordData,
  fetchChangePassword,
} from '../../../store/userSlice';
import cls from './style.module.css';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import ModalWin from '../../../components/ModalWin';
import { schemaChangePassword } from '../../../common/validation/userScheme';

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
  } = useForm<ChangePasswordData>({
    resolver: yupResolver(schemaChangePassword),
  });

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
            errorText={errors.new_password1?.message}
            {...register('new_password1')}
          />
          <Input
            type='password'
            placeholder='Подтвердите пароль'
            errorText={errors.new_password2?.message}
            {...register('new_password2')}
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
