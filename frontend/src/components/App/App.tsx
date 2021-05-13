import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Routes } from '../../common/enums/RoutesEnum';
import CatalogPage from '../../pages/CatalogPage';
import VideoPage from '../../pages/VideoPage';
import SubscriptionPage from '../../pages/SubscriptionPage';
import HeaderPage from '../Header';
import ProfilePage from '../../pages/ProfilePage';
import PaymentPage from '../../pages/PaymentPage';
import { clearHash, setHash } from '../../common/helpers/hashHelper';

function App() {
  useEffect(() => {
    setHash();
    return () => {
      clearHash();
    };
  }, []);

  return (
    <Container fluid='md'>
      <HeaderPage />
      <Switch>
        <Route path={Routes.catalog} component={CatalogPage} />
        <Route path={`${Routes.video}/:id`} component={VideoPage} />
        {/*<Route path={Routes.login} component={LoginPage} />*/}
        {/*<Route path={Routes.registration} component={RegistrationPage} />*/}
        <Route path={Routes.profile} component={ProfilePage} />
        <Route path={Routes.subscription} component={SubscriptionPage} />
        <Route path={Routes.payment} component={PaymentPage} />
        <Redirect from='/' to={Routes.catalog} />
      </Switch>
    </Container>
  );
}

export default App;
