import React from 'react';

import consoleDebug, { RENDER } from '../hooks/useLogging';

const Missing = () => {
  consoleDebug('Missing is rendered ...', RENDER);

  return (
    <div>Missing</div>
  )
}

export default Missing