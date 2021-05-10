import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Routes } from '../../common/enums/RoutesEnum';
import Login from '../Login';
import Registration from '../Registration';
import CatalogPage from '../../pages/CatalogPage';
import VideoPage from '../../pages/VideoPage';
import SubscriptionPage from '../../pages/SubscriptionPage';
import HeaderPage from '../Header';
import ProfilePage from '../../pages/ProfilePage';

function App() {
  return (
    <Container fluid='md'>
      <Login />
      <Registration />
      <HeaderPage />
      <Switch>
        <Route path={Routes.catalog} component={CatalogPage} />
        <Route path={`${Routes.video}/:id`} component={VideoPage} />
        {/*<Route path={Routes.login} component={LoginPage} />*/}
        {/*<Route path={Routes.registration} component={RegistrationPage} />*/}
        <Route path={Routes.profile} component={ProfilePage} />
        <Route path={Routes.subscription} component={SubscriptionPage} />
        <Redirect from='/' to={Routes.catalog} />
      </Switch>
    </Container>
  );
}

export default App;
