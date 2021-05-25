import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import Modal from 'react-modal';
import { Modal } from 'react-bootstrap';
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
import './style.css';
import { IoCloseOutline } from 'react-icons/io5';

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
    border: 'none',
    // width: '404px',
  },
};

export default function AuthPage() {
  const dispatch = useDispatch();
  const isOpen = useSelector(isShowAuth);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {}, []);

  const closeModal = () => {
    dispatch(setIsShowAuth(false));
  };

  const handleToggleType = (ev: any) => {
    ev.preventDefault();
    setIsLogin(!isLogin);
  };

  const handleRegistration = (data: RegistrationData) => {
    dispatch(fetchRegistrationUser(data));
  };

  const handleLogin = (data: LoginData) => {
    dispatch(fetchLoginUser(data));
  };

  return (
    // <Modal style={customStyles} isOpen={isOpen}>
    //   <div className='wrapper_popUp'>
    //     {/*<div className='d-flex justify-content-end mb-3'>*/}
    //     {/*  <button className='btn btn-sm btn-light' onClick={closeModal}>*/}
    //     {/*    close*/}
    //     {/*  </button>*/}
    //     {/*</div>*/}
    //
    //     <div className='close_popUp'>
    //       <button className='button-close' type='button' onClick={closeModal}>
    //         <IoCloseOutline className='button-close-icon' />
    //       </button>
    //     </div>
    //
    //     <div className='header_popUp'>
    //       <span className='title_popUp'>
    //         {isLogin ? 'Вход' : 'Регистрация'}
    //       </span>
    //       <a href='#' className='type_popUp' onClick={handleToggleType}>
    //         {isLogin ? 'Регистрация' : 'Вход'}
    //       </a>
    //     </div>
    //     {isLogin ? (
    //       <Login onLogin={handleLogin} />
    //     ) : (
    //       <Registration onRegistration={handleRegistration} />
    //     )}
    //   </div>
    // </Modal>
    <Modal dialogClassName='modal_popUp' show={isOpen} onHide={closeModal}>
      <div className='wrapper_popUp'>
        <div className='close_popUp'>
          <button className='button-close' type='button' onClick={closeModal}>
            <IoCloseOutline className='button-close-icon' />
          </button>
        </div>

        <div className='header_popUp'>
          <span className='title_popUp'>
            {isLogin ? 'Вход' : 'Регистрация'}
          </span>
          <a href='#' className='type_popUp' onClick={handleToggleType}>
            {isLogin ? 'Регистрация' : 'Вход'}
          </a>
        </div>
        {isLogin ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Registration onRegistration={handleRegistration} />
        )}
      </div>
    </Modal>
  );
}
