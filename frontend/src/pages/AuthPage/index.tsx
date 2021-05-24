import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import {
  fetchLoginUser,
  fetchRegistrationUser,
  isShowAuth,
  LoginData,
  RegistrationData,
  setIsShowAuth,
} from '../../store/userSlice';
import Login from './Login';
import Registration from './Registration';

// interface RegistrationData {
//   email: string;
//   password: string;
// }

// interface LoginData {
//   email: string;
//   password: string;
// }

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
  },
};

export default function AuthPage() {
  const dispatch = useDispatch();
  const isOpen = useSelector(isShowAuth);
  const [type, setType] = useState<'login' | 'registration'>('login');

  useEffect(() => {}, []);

  const closeModal = () => {
    dispatch(setIsShowAuth(false));
  };

  const handleChangeType = (newType: 'login' | 'registration') => {
    setType(newType);
  };

  const handleRegistration = (data: RegistrationData) => {
    dispatch(fetchRegistrationUser(data));
  };

  const handleLogin = (data: LoginData) => {
    dispatch(fetchLoginUser(data));
  };

  return (
    <Modal style={customStyles} isOpen={isOpen}>
      <div className='bg-dark h-100 p-3'>
        <div className='d-flex justify-content-end mb-3'>
          <button className='btn btn-sm btn-light' onClick={closeModal}>
            close
          </button>
        </div>
        {type === 'login' ? (
          <Login onChangeType={handleChangeType} onLogin={handleLogin} />
        ) : (
          <Registration
            onChangeType={handleChangeType}
            onRegistration={handleRegistration}
          />
        )}
      </div>
    </Modal>
  );
}
