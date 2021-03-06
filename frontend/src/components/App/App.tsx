import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Routes } from '../../common/enums/RoutesEnum';
import PrivateRoute from '../PrivateRoute';
import AdminRoute from '../AdminRoute';
import HeaderPage from '../Header';
import CatalogPage from '../../pages/CatalogPage';
import VideoPage from '../../pages/VideoPage';
import EditorPage from '../../pages/EditorPage';
import SubscriptionPage from '../../pages/SubscriptionPage';
import ProfilePage from '../../pages/ProfilePage';
import AuthPage from '../../pages/AuthPage';
import PaymentPage from '../../pages/PaymentPage';
import AboutPage from '../../pages/AboutPage';
import Notification from '../Notification';
import { fetchUser } from '../../store/userSlice';
import { clearHash } from '../../common/helpers/hashHelper';
import { getSettings } from '../../common/helpers/settingsHelper';

import './style.css';

const settings = getSettings();

export const SettingsContext = React.createContext(settings);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    return () => {
      clearHash();
    };
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      <AuthPage />
      <HeaderPage />
      <Notification />
      <div className='container pb-5'>
        <Switch>
          <Route path={Routes.catalog} component={CatalogPage} />
          <Route path={`${Routes.video}/:id`} component={VideoPage} />
          <AdminRoute path={`${Routes.editor}/:id`} component={EditorPage} />
          <PrivateRoute path={Routes.profile} component={ProfilePage} />
          {settings.showSubscription && (
            <Route path={Routes.subscription} component={SubscriptionPage} />
          )}
          <Route path={Routes.payment} component={PaymentPage} />
          <Route path={Routes.about} component={AboutPage} />
          <Redirect from='/' to={Routes.catalog} />
        </Switch>
      </div>
    </SettingsContext.Provider>
  );
}

export default App;
