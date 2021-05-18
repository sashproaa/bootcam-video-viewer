// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Image } from 'react-bootstrap';

const $ipsp = window.$ipsp;

function __DEFAULTCALLBACK__Test(data: any, type: any) {
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

function TEST_CALLBACK(data: any, type: any) {
  console.log('data', data);
  console.log('Оплата успешна');
}

function checkoutInitTest(url) {
  $ipsp('checkout').scope(function () {
    this.setCheckoutWrapper('#checkout_wrapper');
    this.addCallback(__DEFAULTCALLBACK__);
    this.setModal(false);
    // this.setCssStyle(checkoutStyles);
    this.action('show', function (data) {
      // $('#checkout_loader').remove();
      // const loader = document.querySelector('#checkout_loader');
      // loader.parentNode.removeChild(loader);
      // document.querySelector('#checkout_loader').style.display = 'none';
      // $('#checkout').show();
      document.querySelector('#checkout').style.display = 'block';
    });
    this.action('hide', function (data) {
      // $('#checkout').hide();
      document.querySelector('#checkout').style.display = 'none';
    });
    // this.action('resize', function (data) {
    //   $('#checkout_wrapper').height(data.height);
    // });
    this.action('resize', function (data) {
      // $('#checkout_wrapper').width(480).height(data.height);
      // document.querySelector("#checkout_wrapper").style.width = "480px";
      document.querySelector('#checkout_wrapper').style.width = 480;
      document.querySelector('#checkout_wrapper').style.height = data.height;
    });
    this.loadUrl(url);
  });
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
    button.setResponseUrl('https://a65fefcc70d7.ngrok.io/');
    button.addField({
      label: 'Name',
      name: 'name',
      value: 'Name',
      readonly: false,
      required: false,
      valid: {
        pattern: '[a-z]+', //регулярное выражение
      },
    });
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
