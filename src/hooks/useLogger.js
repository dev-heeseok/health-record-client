import React from 'react'

const CONSOL_COLOR = () => ({
  RENDER: "#D27C63",
  LOG: "#0a0a09",
  INFO: "#F9F871",
  ERROR: "#ff3333"
});

export const { LOG, RENDER, REACT, INFO, ERROR } = CONSOL_COLOR();

export function consoleLog(msg, color = LOG) {
  console.log(`%c${msg}`, `color:${color}`);
}

export function consoleInfo(msg, color = INFO) {
  console.info(`%c${msg}`, `color:${color}`);
}

export function consoleError(msg, color = ERROR) {
  console.error(msg);
}

export default function consoleDebug(msg, color = LOG) {
  console.debug(`%c${msg}`, `color:${color}`);
}
