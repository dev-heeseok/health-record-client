import React from 'react';
import {
  Navigate,
  Outlet,
  useLocation
} from 'react-router-dom';

import consoleDebug, { RENDER } from '../hooks/useLogging'
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  consoleDebug('RequireAuth is rendered ...', RENDER);

  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth.roles?.find(role => allowedRoles?.includes(role))
      ? (
        <Outlet />
      )
      : (
        auth.user
          ? (
            <Navigate
              to="/"
              state={{ from: location }}
              replace
            />
          ) : (
            <Navigate
              to="/login"
              state={{ from: location }}
              replace
            />
          )
      )
  );
}

export default RequireAuth