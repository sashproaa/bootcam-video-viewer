// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Image } from 'react-bootstrap';

const $ipsp = window.$ipsp;
const urlM = process.env.REACT_APP_MERCHANT_URL;

function defaultCallbackTest(data: any, type: any) {
  console.log('data', data);
  console.log('Оплата успешна');
  // alert('Оплата успешна');

  // var form;
  console.log('action', data.action);
  console.log('url', data.url);
  console.log('data', data);
  // for (var prop in data.send_data) {
  //   if (data.send_data.hasOwnProperty(prop)) {
  //     console.log(prop, data.send_data[prop]);
  //   }
  // }
  // if (data.error) {
  //   console.log(data, data.error);
  //   return;
  // }
  // if (data.action == 'redirect') {
  //   this.loadUrl(data.url);
  //   return;
  // }
  // if (data.send_data.order_status == 'delayed') {
  //   this.unbind('ready');
  //   this.hide();
  //   return;
  // } else {
  //   this.unbind('ready').action('ready', function () {
  //     this.show();
  //   });
  // }
  // if (data.send_data && data.url) {
  //   form = prepareFormData(data.url, data.send_data);
  //   this.find('body').appendChild(form);
  //   form.submit();
  //   form.parentNode.removeChild(form);
  // }
}

export default function PaymentPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [backRoute, setBackRoute] = useState();

  useEffect(() => {
    console.log('history: ', history);
    console.log('history .length: ', history.length);
    console.log(
      'history []: ',
      history[history.length - 1],
      history[history.length - 2],
    );
    console.log('location: ', location);
    const button = $ipsp.get('button');
    button.setMerchantId(1396424);
    button.setAmount(100, 'UAH', true);
    button.setHost('pay.fondy.eu');
    button.setResponseUrl(urlM);
    button.addField({
      // name: 'name',
      // value: { qqq: 'qqq', www: 'www' },
      data: {
        target: 'video',
        id: 3,
        userId: 2,
      },
      hidden: true,
    });
    button.addParam('server_callback_url', urlM);
    checkoutInit(button.getUrl());
  }, []);

  const handleResult = (data: any, type: any) => {
    console.log('Оплата успешна');
    console.log('data: ', data);
    console.log('type: ', type);
    // alert('Оплата успешна');
    // history.goBack();
    // history.push(backRoute);
  };

  const checkoutInit = (url) => {
    console.log('url: ', url);
    $ipsp('checkout').scope(function () {
      this.setCheckoutWrapper('#checkout_wrapper');
      this.addCallback(handleResult);
      this.setModal(false);
      // this.setCssStyle(checkoutStyles);
      this.action('show', function (data) {
        document.querySelector('#checkout').style.display = 'block';
      });
      this.action('hide', function (data) {
        document.querySelector('#checkout').style.display = 'none';
      });
      this.action('resize', function (data) {
        document.querySelector('#checkout_wrapper').style.width = 480;
        document.querySelector('#checkout_wrapper').style.height = data.height;
      });
      console.log('this: ', this);
      this.loadUrl(url);
    });
  };

  return (
    <div>
      <div id='checkout'>
        <div id='checkout_wrapper' style={{ width: 500, height: 600 }}></div>
      </div>
    </div>
  );
}
