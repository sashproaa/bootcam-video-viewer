import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userInfo } from '../../store/userSlice';
import { Routes } from '../../common/enums/RoutesEnum';

interface Props {
  path?: string;
  component?:
    | React.ComponentType<any>
    | React.ComponentType<RouteComponentProps<any>>
    | undefined;
}

export default function PrivateRoute({ ...props }: Props) {
  const user = useSelector(userInfo);

  return user.id ? <Route {...props} /> : <Redirect to={Routes.catalog} />;
}
