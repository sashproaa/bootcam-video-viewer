import React, { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import cls from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  allSubscriptions,
  fetchSubscriptions,
} from '../../../store/subscriptionSlice';
import { historyTransactions } from '../../../store/paymentSlice';

interface Props {
  className?: string;
}

export default function History({ className = '' }: Props) {
  const dispatch = useDispatch();
  const transactions = useSelector(historyTransactions);

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, []);

  return (
    <table className={cls.table}>
      <tr>
        <th className={cls.header}>Номер</th>
        <th className={cls.header}></th>
        <th className={cls.header}>Сумма</th>
        <th className={cls.header}>Метод</th>
        <th className={cls.header}>Дата</th>
      </tr>
      {transactions.map((transaction) => (
        <tr>
          <td>???</td>
          <td>{transaction.title}</td>
          <td>???</td>
          <td>???</td>
          <td>{transaction.created_at}</td>
        </tr>
      ))}
    </table>
  );
}
