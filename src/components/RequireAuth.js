import React, { useEffect } from 'react';
import {
  Navigate,
  Outlet,
  useLocation
} from 'react-router-dom';

import { consoleInfo } from '../hooks/useLogger'
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    consoleInfo("RequireAuth useEffect");

  }, []);

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