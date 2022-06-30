import React from 'react';
import { Outlet } from 'react-router-dom';

import consoleDebug, { RENDER } from '../hooks/useLogging';

const Layout = () => {
  consoleDebug('Layout is rendered ...', RENDER);
  
  return (
    <main className='App'>
      <Outlet />
    </main>
  )
}

export default Layout