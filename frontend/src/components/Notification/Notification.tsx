import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showNotice, clearNotice } from '../../store/notificationSlice';
import { RootState } from '../../store/store';

function Notification() {
  const text = useSelector((state: RootState) => state.notification.text);
  const status = useSelector((state: RootState) => state.notification.status);
  const isShow = useSelector((state: RootState) => state.notification.isShow);
  const dispatch = useDispatch();

  let notify: React.MouseEventHandler<HTMLButtonElement> = () => null;

  useEffect(() => {
    if (isShow) {
      switch (status) {
        case 'error':
          toast.error(text);
          break;
        case 'success':
          toast.success(text);
          break;
        case 'info':
          toast.info(text);
          break;
      }
      dispatch(clearNotice());
    }
  }, [isShow, text, status, dispatch]);

  return (
    <div>
      <button
        onClick={() => {
          dispatch(
            showNotice({
              text: 'Возникла ошибка',
              isShow: true,
              status: 'error',
            }),
          );
        }}
      >
        Notify!
      </button>
      <ToastContainer />
    </div>
  );
}

export default Notification;
