import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Image } from 'react-bootstrap';
import userImg from '../../assets/user.png';
import { fetchUser, userInfo } from '../../store/userSlice';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector(userInfo);

  useEffect(() => {
    dispatch(fetchUser(1));
  }, []);

  return (
    <div>
      <Row className='justify-content-center mb-3'>
        <Image src={userImg} rounded />
      </Row>
      <Row className='justify-content-center'>
        <Col xs={6}>
          <Row className='align-items-center'>
            <Col>
              <h5>Name:</h5>
            </Col>
            <Col>
              <h6>{user.name}</h6>
            </Col>
          </Row>
          <Row className='align-items-center'>
            <Col>
              <h5>Last Name:</h5>
            </Col>
            <Col>
              <h6>{user.lastName}</h6>
            </Col>
          </Row>
          <Row className='align-items-center'>
            <Col>
              <h5>Email:</h5>
            </Col>
            <Col>
              <h6>{user.email}</h6>
            </Col>
          </Row>
          <Row className='align-items-center'>
            <Col>
              <h5>Password:</h5>
            </Col>
            <Col>
              <h6>*********</h6>
            </Col>
          </Row>
          <Row className='align-items-center'>
            <Col>
              <h5>Subscription:</h5>
            </Col>
            <Col>
              <h6>{user.subscription}</h6>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
