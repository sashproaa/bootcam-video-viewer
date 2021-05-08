import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from '../../common/enums/RoutesEnum';
import Login from '../Login';
import Registration from '../Registration';

function App() {
  return (
    <>
      <Login />
      <Registration/>
      <Switch>
        {/*<Route path={Routes.catalog} component={CatalogPage} />*/}
        {/*<Route path={Routes.video} component={VideoPage} />*/}
        {/*<Route path={Routes.login} component={LoginPage} />*/}
        {/*<Route path={Routes.registration} component={RegistrationPage} />*/}
        {/*<Route path={Routes.profile} component={ProfilePage} />*/}
        {/*<Route path={Routes.subscription} component={SubscriptionPage} />*/}
        {/*<Redirect from='/' to={Routes.catalog} />*/}
      </Switch>
    </>
  );
}

export default App;
