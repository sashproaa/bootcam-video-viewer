import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAdminUser } from '../../store/userSlice';
import { Routes } from '../../common/enums/RoutesEnum';

interface Props {
  path?: string;
  component?:
    | React.ComponentType<any>
    | React.ComponentType<RouteComponentProps<any>>
    | undefined;
}

export default function AdminRoute({ ...props }: Props) {
  const admin = useSelector(isAdminUser);

  return admin ? <Route {...props} /> : <Redirect to={Routes.catalog} />;
}
