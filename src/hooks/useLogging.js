import React from 'react'

const MSG_COLOR = () => ({
  MESSAGE: "#83a7a3",
  RENDER: "#caa6fe"
});

export const { MESSAGE, RENDER } = MSG_COLOR();

export function consoleLog(msg, color = MESSAGE) {
  console.log(`%c${msg}`, `color:${color}`);
}

export function consoleInfo(msg, color = MESSAGE) {
  console.info(`%c${msg}`, `color:${color}`);
}

export default function consoleDebug(msg, color = MESSAGE) {
  console.debug(`%c${msg}`, `color:${color}`);
}
