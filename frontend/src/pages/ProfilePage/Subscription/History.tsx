import React, { useEffect } from 'react';
import cls from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchHistoryTransactions,
  historyTransactions,
} from '../../../store/paymentSlice';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Transaction } from '../../../common/interfaces/TransactionInterface';

interface Props {
  className?: string;
}

const getName = (transaction: Transaction): string => {
  const merchant_data = transaction.json_description.merchant_data;
  const data = JSON.parse(merchant_data)[0];
  const info = JSON.parse(data.value);
  return `${info.targetName}: ${info.name}`;
};

export default function History({ className = '' }: Props) {
  const dispatch = useDispatch();
  const transactions = useSelector(historyTransactions);

  useEffect(() => {
    dispatch(fetchHistoryTransactions());
  }, []);

  return (
    <table className={cls.table}>
      <tr>
        <th className={cls.header}>Номер</th>
        <th className={cls.header}>Назначение</th>
        <th className={cls.header}>Сумма</th>
        <th className={cls.header}>Метод</th>
        <th className={cls.header}>Дата</th>
      </tr>
      {transactions.map((transaction) => (
        <tr key={transaction.hash}>
          <td>
            <OverlayTrigger
              overlay={
                <Tooltip id={`tooltip-${transaction.hash}`}>
                  {transaction.hash}
                </Tooltip>
              }
            >
              <span>{transaction.hash.slice(0, 5)}</span>
            </OverlayTrigger>
          </td>
          <td>{getName(transaction)}</td>
          <td>{transaction.price}</td>
          <td>{transaction.json_description.payment_system}</td>
          <td>
            <OverlayTrigger
              overlay={
                <Tooltip id={`tooltip-${transaction.hash}`}>
                  {transaction.json_description.order_time}
                </Tooltip>
              }
            >
              <span>
                {transaction.json_description.order_time.split(' ')[0]}
              </span>
            </OverlayTrigger>
          </td>
        </tr>
      ))}
    </table>
  );
}
