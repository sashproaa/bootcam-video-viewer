import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardDeck, Col, Row } from 'react-bootstrap';
import {
  allSubscriptions,
  fetchSubscriptions,
} from '../../store/subscriptionSlice';

export default function SubscriptionPage() {
  const dispatch = useDispatch();
  const subscriptions = useSelector(allSubscriptions);

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, []);

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
              <Button>Купить за {subscription.price}грн</Button>
            </Card.Footer>
          </Card>
        ))}
      </CardDeck>
    </div>
  );
}
