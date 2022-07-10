import React from 'react';

import consoleDebug, { RENDER } from '../hooks/useLogger';

const Missing = () => {
  consoleDebug('Missing is rendered ...', RENDER);

  return (
    <div>Missing</div>
  )
}

export default Missing