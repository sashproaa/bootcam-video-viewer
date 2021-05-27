import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
      <div className='container'>
        <Switch>
          <Route path={Routes.catalog} component={CatalogPage} />
          <Route path={`${Routes.video}/:id`} component={VideoPage} />
          <Route path={`${Routes.editor}/:id`} component={EditorPage} />
          {/*<Route path={Routes.login} component={LoginPage} />*/}
          {/*<Route path={Routes.registration} component={AuthPage} />*/}
          <Route path={Routes.profile} component={ProfilePage} />
          <Route path={Routes.subscription} component={SubscriptionPage} />
          <Route path={Routes.payment} component={PaymentPage} />
          <Redirect from='/' to={Routes.catalog} />
        </Switch>
      </div>
    </>
  );
}

export default App;
