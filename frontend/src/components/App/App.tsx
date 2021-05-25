import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from '../../common/enums/RoutesEnum';
import CatalogPage from '../../pages/CatalogPage';
import VideoPage from '../../pages/VideoPage';
import SubscriptionPage from '../../pages/SubscriptionPage';
import HeaderPage from '../Header';
import ProfilePage from '../../pages/ProfilePage';
import { clearHash, setHash } from '../../common/helpers/hashHelper';
import './style.css';
import AuthPage from '../../pages/AuthPage';
import Notification from '../Notification';

function App() {
  useEffect(() => {
    setHash();
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
          {/*<Route path={Routes.login} component={LoginPage} />*/}
          {/*<Route path={Routes.registration} component={AuthPage} />*/}
          <Route path={Routes.profile} component={ProfilePage} />
          <Route path={Routes.subscription} component={SubscriptionPage} />
          <Redirect from='/' to={Routes.catalog} />
        </Switch>
      </div>
    </>
  );
}

export default App;
