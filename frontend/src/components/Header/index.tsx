import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Routes } from '../../common/enums/RoutesEnum';

export default function HeaderPage() {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <Navbar className='mb-3' bg='dark' variant='dark'>
      <Link to={Routes.catalog}>
        <Navbar.Brand>Logo</Navbar.Brand>
      </Link>
      <Form className='mr-auto ml-auto' inline>
        <FormControl type='text' placeholder='Search' className='mr-sm-2' />
        <Button variant='outline-info'>Search</Button>
      </Form>
      <Nav>
        <Link to={Routes.profile}>
          <Navbar.Text>Login</Navbar.Text>
        </Link>
      </Nav>
    </Navbar>
  );
}
