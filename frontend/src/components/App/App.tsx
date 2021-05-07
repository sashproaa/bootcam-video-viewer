import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from '../../common/enums/RoutesEnum';
import Login from '../Login';

function App() {
  return (
    <>
      <Login/>
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
