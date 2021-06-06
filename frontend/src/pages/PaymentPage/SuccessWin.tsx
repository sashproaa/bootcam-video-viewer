import React from 'react';
import ModalWin from '../../components/ModalWin';
import Button from '../../components/Button';
import cls from './style.module.css';

interface Props {
  show: boolean;
  onClose: () => void;
  type: 'video' | 'subscription';
}

export default function SuccessWin({ show, onClose, type }: Props) {
  return (
    <ModalWin className={cls.successWin} show={show} onClose={onClose}>
      <div className={cls.successWrap}>
        <h4 className={cls.successHeader}>Оплата прошла успешно!</h4>

        {type === 'video' && (
          <p className={cls.successText}>
            Благодарим за покупку! Спектакль доступен к просмотру. Он
            сохраняется в вашем профиле в разделе “Мои спектакли”, вкладка
            “Купленные”. Приятного просмотра!
          </p>
        )}

        {type === 'subscription' && (
          <p className={cls.successText}>
            Благодарим за покупку! Ваша подписка оформлена, теперь вы можете
            перейти в каталог и выбрать спектакль. Приятного просмотра!
          </p>
        )}

        <Button className={cls.successBtn} onClick={onClose}>
          {type === 'video' ? 'Смотреть спектакль' : ''}
          {type === 'subscription' ? 'Перейти в каталог' : ''}
        </Button>
      </div>
    </ModalWin>
  );
}
