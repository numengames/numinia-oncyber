import * as React from 'react';

import Styles from './Styles.tsx';

interface AppProps {
  components: React.ReactNode[];
}

export default function App({ components }: AppProps) {
  return (
    <div className="app">
      {components.map((Component, index) => (
        <React.Fragment key={index}>{Component}</React.Fragment>
      ))}
      <Styles />
    </div>
  );
}
