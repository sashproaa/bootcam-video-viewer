import sha1 from 'crypto-js/sha1';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import { MerchantData } from '../../store/paymentSlice';
import {
  liqpayPublicKey,
  liqpayPrivateKey,
  liqpayResultUrl,
  liqpayServerUrl,
} from '../../common/config';

interface Props {
  targetData: MerchantData;
  price: string;
  currency?: string;
}

export function liqpayData({ targetData, price, currency = 'UAH' }: Props) {
  const data = {
    version: 3,
    public_key: liqpayPublicKey,
    private_key: liqpayPrivateKey,
    action: 'pay',
    amount: Number(price),
    currency: currency,
    description: JSON.stringify(targetData),
    // order_id: '',
    result_url: liqpayResultUrl,
    server_url: liqpayServerUrl,
    // verifycode: 'Y',
  };

  // return Buffer.from(JSON.stringify(data)).toString('base64');
  return Base64.stringify(Utf8.parse(JSON.stringify(data)));
}

export function liqpaySignature(data: string) {
  const stringSignature = liqpayPrivateKey + data + liqpayPrivateKey;
  const hash = sha1(stringSignature);
  return Base64.stringify(hash);
}

export default {
  liqpayData,
  liqpaySignature,
};
