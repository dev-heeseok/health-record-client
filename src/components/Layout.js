import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { consoleInfo } from '../hooks/useLogger';

const Layout = () => {
  useEffect(() => {
    consoleInfo("Layout useEffect");

  }, []);

  return (
    <main className='App'>
      <Outlet />
    </main>
  )
}

export default Layout