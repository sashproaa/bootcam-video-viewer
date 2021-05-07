import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Routes } from '../../common/enums/RoutesEnum';
import CatalogPage from '../../pages/CatalogPage';
import VideoPage from '../../pages/VideoPage';

function App() {
  return (
    <Container>
      <Switch>
        <Route path={Routes.catalog} component={CatalogPage} />
        <Route path={`${Routes.video}/:id`} component={VideoPage} />
        {/*<Route path={Routes.login} component={LoginPage} />*/}
        {/*<Route path={Routes.registration} component={RegistrationPage} />*/}
        {/*<Route path={Routes.profile} component={ProfilePage} />*/}
        {/*<Route path={Routes.subscription} component={SubscriptionPage} />*/}
        <Redirect from='/' to={Routes.catalog} />
      </Switch>
    </Container>
  );
}

export default App;
