import React from 'react';
import useAuth from './useAuth';
import axios from '../api/axios';
import consoleDebug, { RENDER } from './useLogger';

const useRefresh = () => {
  consoleDebug("useRefresh is running ... ", RENDER);

  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axios.get("api/users/refresh", {
      withCredentials: true
    }

    return res;
  };

  return refresh;
}

export default useRefresh