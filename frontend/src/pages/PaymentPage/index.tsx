import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleanPaymentData,
  merchantDataState,
  priceState,
  updatePaymentUserId,
} from '../../store/paymentSlice';
import cls from './style.module.css';
import { showNoticeError } from '../../store/notificationSlice';
import { Routes } from '../../common/enums/RoutesEnum';
import { setIsShowAuth, userInfo } from '../../store/userSlice';
import SuccessWin from './SuccessWin';
import liqpayPropsHelper from './liqpayHelper';

export default function PaymentPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(userInfo);
  const merchantData = useSelector(merchantDataState);
  const price = useSelector(priceState);

  const [showApproved, setShowApproved] = useState(false);

  useEffect(() => {
    if (!user.id) dispatch(setIsShowAuth(true));
    return () => {
      dispatch(cleanPaymentData());
    };
  }, []);

  useEffect(() => {
    if (user.id) dispatch(updatePaymentUserId());
  }, [user.id]);

  useEffect(() => {
    if (merchantData && merchantData.userId && price) {
      const { data, signature } = liqpayPropsHelper({
        targetData: merchantData,
        price,
        currency: 'UAH',
      });
      const LiqPayCheckoutCallback = () => {
        // @ts-ignore
        LiqPayCheckout.init({
          data,
          signature,
          embedTo: '#liqpay_checkout',
          language: 'ru',
          mode: 'embed',
        })
          .on('liqpay.callback', handleResult)
          .on('liqpay.ready', function (data: any) {
            // ready
            console.log('ready data: ', data);
          })
          .on('liqpay.close', function (data: any) {
            // close
            console.log('close data: ', data);
          });
      };
      LiqPayCheckoutCallback();
    }
  }, [merchantData]);

  if (!merchantData) {
    history.goBack();
    return null;
  }

  const handleResult = (data: any) => {
    console.log(data.status);
    console.log(data);
    if (data.status === 'success') {
      setShowApproved(true);
    }
    if (data.status === 'error') {
      dispatch(showNoticeError(data.err_decription));
    }
  };

  const closeApproved = () => {
    setShowApproved(false);
    if (merchantData.target === 'video') {
      history.push(`${Routes.video}/${merchantData.id}`);
    } else {
      history.push(Routes.catalog);
    }
  };

  return (
    <>
      <div className='d-flex justify-content-center align-items-center'>
        {/*<div className={cls.testCards}>*/}
        {/*  <div>*/}
        {/*    4444555566661111 &emsp; <b>успешный</b> &emsp; <i>3DSecure</i>*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    4444111166665555 &emsp; <b>отказ</b> &emsp; &emsp; <i>3DSecure</i>*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    4444555511116666 &emsp; <b>успешный</b> <i></i>*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    4444111155556666 &emsp; <b>отказ</b> <i></i>*/}
        {/*  </div>*/}
        {/*  <div>Срок действия и cvv любые</div>*/}
        {/*</div>*/}

        <div id='liqpay_checkout'></div>
      </div>

      <SuccessWin
        show={showApproved}
        onClose={closeApproved}
        type={merchantData.target}
      />
    </>
  );
}
