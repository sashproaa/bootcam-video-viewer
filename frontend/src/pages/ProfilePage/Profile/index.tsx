import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../../common/interfaces/UserInterface';
import { fetchUpdateUser, userInfo } from '../../../store/userSlice';
import cls from './style.module.css';
import Header from '../Header';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import ButtonLine from '../../../components/ButtonLine';
import Checkbox from '../../../components/Checkbox';
import ButtonClean from '../../../components/ButtonClean';
import { Lock } from 'react-feather';
import ModalWin from '../../../components/ModalWin';
import ChangePassword from '../ChangePassword';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaProfile } from '../../../common/validation/userScheme';

interface UserForm extends Omit<User, 'avatar'> {
  image?: any;
}

interface Props {
  className?: string;
}

const getDate = (years: number) => {
  const current = new Date();
  const date = current.setFullYear(current.getFullYear() - years);
  return new Date(date).toISOString().split('T')[0];
};

export default function Profile({ className = '' }: Props) {
  const dispatch = useDispatch();
  const user = useSelector(userInfo);

  const [isNotice, setIsNotice] = useState(true);
  const [showWin, setShowWin] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserForm>({
    resolver: yupResolver(schemaProfile),
  });

  const onSubmit: SubmitHandler<UserForm> = (data) => {
    const filterData = { ...data, gender: data.gender ? data.gender : null };
    dispatch(fetchUpdateUser(filterData as User));
  };

  const handleReset = () => {
    reset();
  };

  const handleChangeIsNotice = () => {
    setIsNotice(!isNotice);
  };

  const handleShowWin = () => {
    setShowWin(true);
  };

  const handleCloseWin = () => {
    setShowWin(false);
  };

  return (
    <>
      <Header>
        <h1 className={cls.header}>Профиль</h1>
      </Header>
      <div className='row'>
        <div className={`col-6 ${cls.fillProfile}`}>
          <form onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
            <div className={cls.inputBlock}>
              <label htmlFor='first_name' className={cls.label}>
                Имя
              </label>
              <Input
                type='text'
                id='first_name'
                fill
                dark
                defaultValue={user.first_name}
                errorText={errors.first_name?.message}
                {...register('first_name')}
              />
            </div>

            {/*<div className={cls.inputBlock}>*/}
            {/*  <label htmlFor='last_name' className={cls.label}>*/}
            {/*    Фамилия*/}
            {/*  </label>*/}
            {/*  <Input*/}
            {/*    type='text'*/}
            {/*    id='last_name'*/}
            {/*    fill*/}
            {/*    dark*/}
            {/*    defaultValue={user.last_name}*/}
            {/*    errorText={errors.last_name?.message}*/}
            {/*    {...register('last_name')}*/}
            {/*  />*/}
            {/*</div>*/}

            <div className={cls.inputBlock}>
              <label htmlFor='mobile' className={cls.label}>
                Телефон
              </label>
              <Input
                type='tel'
                id='mobile'
                fill
                dark
                placeholder='+38xxxyyyyyyy'
                defaultValue={user.mobile}
                errorText={errors.mobile?.message}
                {...register('mobile')}
              />
            </div>

            <div className={cls.inputBlock}>
              <label htmlFor='date_of_birth' className={cls.label}>
                День рождения
              </label>
              <Input
                type='date'
                id='date_of_birth'
                fill
                dark
                min={getDate(101)}
                max={getDate(14)}
                defaultValue={user.date_of_birth}
                errorText={errors.date_of_birth?.message}
                {...register('date_of_birth')}
              />
            </div>

            <div className={cls.inputBlock}>
              <label htmlFor='gender' className={cls.label}>
                Пол
              </label>
              <Select
                id='gender'
                fill
                dark
                defaultValue={user.gender || ''}
                {...register('gender')}
              >
                <option value='M'>Мужской</option>
                <option value='F'>Женский</option>
                <option value=''>Не знаю</option>
              </Select>
            </div>

            <div className={cls.buttons}>
              <ButtonLine type='reset'>Сброс</ButtonLine>
              <Button className='flex-grow-1' type='submit'>
                Сохранить
              </Button>
            </div>
          </form>
        </div>
        <div className={`col-5 offset-1 ${cls.profileAction}`}>
          {/*<div className={cls.action}>*/}
          {/*  <p>Уведомления</p>*/}
          {/*  <Checkbox*/}
          {/*    label='Email'*/}
          {/*    dark*/}
          {/*    checked={isNotice}*/}
          {/*    onChange={handleChangeIsNotice}*/}
          {/*  />*/}
          {/*</div>*/}
          <div className={cls.action}>
            <ButtonClean onClick={handleShowWin}>
              <Lock size={20} />
              <span>&emsp;Изменить пароль</span>
            </ButtonClean>
          </div>
        </div>
      </div>

      <ChangePassword show={showWin} onClose={handleCloseWin} />
    </>
  );
}
