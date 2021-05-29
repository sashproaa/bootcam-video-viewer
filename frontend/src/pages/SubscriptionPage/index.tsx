import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardDeck, Col, Row } from 'react-bootstrap';
import {
  allSubscriptions,
  fetchSubscriptions,
} from '../../store/subscriptionSlice';
import { setPaymentData } from '../../store/paymentSlice';
import { Routes } from '../../common/enums/RoutesEnum';
import { Subscription } from '../../common/interfaces/SubscriptionInterface';

export default function SubscriptionPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const subscriptions = useSelector(allSubscriptions);

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, []);

  const handlePayment = (subscription: Subscription) => () => {
    dispatch(
      setPaymentData({
        data: {
          target: 'subscription',
          id: subscription.id,
          projectId: subscription.project_id,
        },
        price: subscription.price,
      }),
    );
    history.push(Routes.payment);
  };

  return (
    <div>
      <h1 className='text-center mb-5'>Выберите подписку</h1>
      <CardDeck className='mb-5'>
        {subscriptions.map((subscription) => (
          <Card key={subscription.id}>
            <Card.Header>
              <h2 className='text-center'>{subscription.duration} Дней</h2>
            </Card.Header>
            <Card.Body>
              <Card.Title>{subscription.name}</Card.Title>
              <Card.Text>{subscription.description}</Card.Text>
            </Card.Body>
            <Card.Footer className='text-center'>
              <Button onClick={handlePayment(subscription)}>
                Купить за {subscription.price}грн
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </CardDeck>
    </div>
  );
}
