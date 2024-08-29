import * as React from 'react';

export default function Styles() {
  const css = `
    html,
    body {
      height: 100dvh;
    }
    
    .app {
      height: 500dvh;
    }
  `;

  return <style>{css}</style>;
}
