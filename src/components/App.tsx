import * as React from 'react';

import globalStyles from './Styles.tsx';
import ImplementationGuideOverlay from './overlays/ImplementationGuide.tsx';

export default () => {
  return (
    <>
      <ImplementationGuideOverlay />
      <style>{globalStyles}</style>
    </>
  );
}
