import React from 'react';

import consoleDebug, { RENDER } from '../hooks/useLogger';

const Home = () => {
  consoleDebug('Home is rendered ...', RENDER);
  
  return (
    <div>Home</div>
  )
}

export default Home