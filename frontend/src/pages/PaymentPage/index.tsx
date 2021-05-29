// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { merchantId, merchantUrl } from '../../common/config';
import { merchantDataState, priceState } from '../../store/paymentSlice';
import cls from './style.module.css';
import { showNoticeError } from '../../store/notificationSlice';
import ModalWin from '../../components/ModalWin';
import { Routes } from '../../common/enums/RoutesEnum';

const $ipsp = window.$ipsp;

export default function PaymentPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const merchantData = useSelector(merchantDataState);
  const price = useSelector(priceState);

  const [showApproved, setShowApproved] = useState(false);

  useEffect(() => {
    if (merchantData) createPaymentForm();
  }, [merchantData]);

  const createPaymentForm = () => {
    const button = $ipsp.get('button');
    button.setMerchantId(Number(merchantId));
    button.setAmount(price, 'UAH', true);
    button.setHost('pay.fondy.eu');
    button.setResponseUrl(merchantUrl);
    button.addField({
      name: 'paymentData',
      label: 'Payment data',
      value: JSON.stringify(merchantData),
      hidden: true,
    });
    button.addParam('server_callback_url', merchantUrl);
    checkoutInit(button.getUrl());
  };

  const checkoutInit = (url) => {
    $ipsp('checkout').scope(function () {
      this.setCheckoutWrapper('#checkout_wrapper');
      this.addCallback(handleResult);
      this.setModal(false);
      this.setCheckoutWidth(480);
      this.setCheckoutHeight(450);
      // this.setCssStyle(checkoutStyles);
      this.action('show', function (data) {
        document.querySelector('#checkout').style.display = 'block';
      });
      this.action('hide', function (data) {
        document.querySelector('#checkout').style.display = 'none';
      });
      this.action('resize', function (data) {
        this.setCheckoutHeight(data.height);
        // document.querySelector('#checkout_wrapper').style.width = 480;
        // document.querySelector('#checkout_wrapper').style.height = data.height;
      });
      // handle decline response from checkout
      this.action('decline', function (data, type) {
        console.log('decline', data);
      });
      this.action('message', function (data, type) {
        console.log('message', data);
      });
      this.loadUrl(url);
    });
  };

  const handleResult = (data: any, type: any) => {
    console.log('res data: ', data);
    console.log('res type: ', type);
    if (data.action == 'redirect') {
      dispatch(showNoticeError('Ошибка при оплате'));
    }
    if (data.error) {
      dispatch(showNoticeError(data.error.message));
    }
    if (data.send_data && data.send_data.order_status === 'approved') {
      setShowApproved(true);
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
    <div className='d-flex justify-content-center align-items-center'>
      <div className={cls.testCards}>
        <div>
          4444555566661111 &emsp; <b>успешный</b> &emsp; <i>3DSecure</i>
        </div>
        <div>
          4444111166665555 &emsp; <b>отказ</b> &emsp; &emsp; <i>3DSecure</i>
        </div>
        <div>
          4444555511116666 &emsp; <b>успешный</b> <i></i>
        </div>
        <div>
          4444111155556666 &emsp; <b>отказ</b> <i></i>
        </div>
        <div>Срок действия и cvv любые</div>
      </div>
      <div id='checkout'>
        {/*<div id='checkout_wrapper' style={{ width: 500, height: 600 }}></div>*/}
        <div id='checkout_wrapper'></div>
      </div>
      <ModalWin show={showApproved} onClose={closeApproved}>
        <div className='d-flex flex-column justify-content-center align-items-center text-dark'>
          <h4>Оплата прошла успешно!</h4>
          <p>
            Благодарим за покупку! Ваша подписка оформлена, теперь вы можете
            перейти в каталог и выбрать спектакль. Приятного просмотра!
          </p>
          <button className='btn btn-danger' onClick={closeApproved}>
            {merchantData.target === 'video'
              ? 'Смотреть спектакль'
              : 'Перейти в каталог'}
          </button>
        </div>
      </ModalWin>
    </div>
  );
}
