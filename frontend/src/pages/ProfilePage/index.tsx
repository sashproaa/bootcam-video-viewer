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

// const baseRoute = Routes.profile;
//
// enum RoutesProfile {
//   profile = '/profile',
//   subscription = '/subscription',
//   video = '/video',
// }

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
    // <div>
    //   <div>
    //     <Link to={`${baseRoute}${RoutesProfile.profile}`}>Профиль</Link>
    //     <Link to={`${baseRoute}${RoutesProfile.subscription}`}>Подписки</Link>
    //     <Link to={`${baseRoute}${RoutesProfile.video}`}>Видео</Link>
    //     <button onClick={handleLogout}>Выйти</button>
    //   </div>
    //   <Row className='justify-content-center mb-3'>
    //     <Image src={userImg} rounded />
    //   </Row>
    //   <Switch>
    //     <Route
    //       path={`${baseRoute}${RoutesProfile.profile}`}
    //       component={Profile}
    //     />
    //     <Route
    //       path={`${baseRoute}${RoutesProfile.subscription}`}
    //       component={Subscription}
    //     />
    //     <Route path={`${baseRoute}${RoutesProfile.video}`} component={Video} />
    //     <Redirect
    //       from={`${baseRoute}`}
    //       to={`${baseRoute}${RoutesProfile.profile}`}
    //     />
    //   </Switch>
    // </div>
  );
}
