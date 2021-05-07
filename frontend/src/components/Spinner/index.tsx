import React from 'react';
import { Row, Spinner as SpinnerBootstrap } from 'react-bootstrap';

export default function Spinner() {
  return (
    <Row className='justify-content-center'>
      <SpinnerBootstrap
        animation='border'
        style={{ width: '5rem', height: '5rem' }}
      />
    </Row>
  );
}
