import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../../common/interfaces/UserInterface';
import { fetchUpdateUser, userInfo } from '../../../store/userSlice';
import cls from './style.module.css';

interface UserForm extends Omit<User, 'avatar'> {
  image?: any;
}

interface Props {
  className?: string;
}

export default function Profile({ className = '' }: Props) {
  const dispatch = useDispatch();
  const user = useSelector(userInfo);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserForm>();

  const onSubmit: SubmitHandler<UserForm> = (data) => {
    dispatch(fetchUpdateUser(data as User));
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className={className}>
      <h1>Профиль</h1>
      <form onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
        <div className='mb-6'>
          <label htmlFor='first_name' className='form-label'>
            Имя
          </label>
          <input
            type='text'
            className='form-control'
            id='first_name'
            defaultValue={user.first_name}
            {...register('first_name', { required: false })}
          />
        </div>

        <div className='mb-6'>
          <label htmlFor='last_name' className='form-label'>
            Фамилия
          </label>
          <input
            type='text'
            className='form-control'
            id='last_name'
            defaultValue={user.last_name}
            {...register('last_name', { required: false })}
          />
        </div>

        {/*<div className='mb-6'>*/}
        {/*  <label htmlFor='email' className='form-label'>*/}
        {/*    Почта*/}
        {/*  </label>*/}
        {/*  <input*/}
        {/*    type='text'*/}
        {/*    className='form-control'*/}
        {/*    id='email'*/}
        {/*    defaultValue={user.email}*/}
        {/*    {...register('email', { required: true })}*/}
        {/*  />*/}
        {/*</div>*/}

        <div className='mb-6'>
          <label htmlFor='mobile' className='form-label'>
            Телефон
          </label>
          <input
            type='tel'
            className='form-control'
            id='mobile'
            defaultValue={user.mobile}
            {...register('mobile', { required: false })}
          />
        </div>

        <div className='mb-6'>
          <label htmlFor='date_of_birth' className='form-label'>
            День рождения
          </label>
          <input
            type='date'
            className='form-control'
            id='date_of_birth'
            defaultValue={user.date_of_birth}
            {...register('date_of_birth', { required: false })}
          />
        </div>

        <div className='mb-6'>
          <label htmlFor='gender' className='form-label'>
            Пол
          </label>
          <input
            type='radio'
            className='form-control'
            id='genderM'
            {...register('gender', { required: false })}
            defaultValue={user.gender}
            value='M'
          />
          <input
            type='radio'
            className='form-control'
            id='genderW'
            {...register('gender', { required: false })}
            defaultValue={user.gender}
            value='W'
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Сохранить
        </button>
        <button type='reset' className='btn btn-primary'>
          Сброс
        </button>
      </form>
    </div>
  );
}
