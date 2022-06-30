import React from 'react';

import consoleDebug, { RENDER } from '../hooks/useLogging';

const Home = () => {
  consoleDebug('Home is rendered ...', RENDER);
  
  return (
    <div>Home</div>
  )
}

export default Home