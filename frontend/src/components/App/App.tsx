import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Routes } from '../../common/enums/RoutesEnum';
import HeaderPage from '../Header';
import CatalogPage from '../../pages/CatalogPage';
import VideoPage from '../../pages/VideoPage';
import EditorPage from '../../pages/EditorPage';
import SubscriptionPage from '../../pages/SubscriptionPage';
import ProfilePage from '../../pages/ProfilePage';
import AuthPage from '../../pages/AuthPage';
import PaymentPage from '../../pages/PaymentPage';
import { clearHash, setHash } from '../../common/helpers/hashHelper';
import './style.css';
import Notification from '../Notification';

import { fetchUser } from '../../store/userSlice';
import PrivateRoute from '../PrivateRoute';
import AdminRoute from '../AdminRoute';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // setHash();
    dispatch(fetchUser());
    return () => {
      clearHash();
    };
  }, []);

  return (
    <>
      <AuthPage />
      <HeaderPage />
      <Notification />
      <div className='container'>
        <Switch>
          <Route path={Routes.catalog} component={CatalogPage} />
          <Route path={`${Routes.video}/:id`} component={VideoPage} />
          <AdminRoute path={`${Routes.editor}/:id`} component={EditorPage} />
          <PrivateRoute path={Routes.profile} component={ProfilePage} />
          <Route path={Routes.subscription} component={SubscriptionPage} />
          <Route path={Routes.payment} component={PaymentPage} />
          <Redirect from='/' to={Routes.catalog} />
        </Switch>
      </div>
    </>
  );
}

export default App;
