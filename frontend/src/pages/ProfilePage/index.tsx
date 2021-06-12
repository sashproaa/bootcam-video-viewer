import React, { useEffect } from 'react';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Image } from 'react-bootstrap';
import userImg from '../../assets/user.png';
import { fetchLogoutUser, fetchUser, userInfo } from '../../store/userSlice';
import { Routes } from '../../common/enums/RoutesEnum';
import Profile from './Profile';
import Subscription from './Subscription';
import Video from './Video';
import GoBack from '../../components/GoBack';
import cls from './style.module.css';
import SideBar from './SideBar';
import { RoutesProfile } from './RoutesProfileEnum';
import './style.css';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(userInfo);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const handleLogout = () => {
    dispatch(fetchLogoutUser());
    history.push(Routes.catalog);
  };

  return (
    <>
      <GoBack href={Routes.catalog}>Каталог</GoBack>
      <div className='row'>
        <div className={`col-4 ${cls.sidebar}`}>
          <SideBar />
        </div>
        <div className={`col-8 ${cls.main}`}>
          <Switch>
            <Route path={RoutesProfile.profile} component={Profile} />
            <Route path={RoutesProfile.subscription} component={Subscription} />
            <Route path={RoutesProfile.video} component={Video} />
            <Redirect from={Routes.profile} to={RoutesProfile.profile} />
          </Switch>
        </div>
      </div>
    </>
  );
}
