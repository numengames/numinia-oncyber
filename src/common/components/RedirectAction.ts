import { Player, Component3D } from '@oo/scripting';

import fadeOut from '../effects/FadeOut.ts';
import isValidUrl from '../utils/isValidUrl.ts';

interface RedirectActionParams {
  redirectMode: string;
  redirectToUrl: string;
  fadeOutDuration?: number;
  holdTimeDuration?: number;
  isFadingAvailable?: boolean;
}

const goToAnotherSpace = (url: string, mode: string): void => {
  const newWindow = window.open(url, mode);

  if (newWindow) {
    newWindow.focus();
  } else {
    console.error('Failed to open new window or tab.');
  }
};

const applyFadeOut = (targetComponent: Component3D, duration: number): void => {
  fadeOut({ targetComponent, duration });
};

const performRedirection = (redirectMode: string, redirectToUrl: string) => {
  if (redirectMode === 'Existing') {
    window.location.href = redirectToUrl;
  } else {
    goToAnotherSpace(redirectToUrl, redirectMode);
  }
};

export default ({
  redirectMode,
  redirectToUrl,
  fadeOutDuration,
  holdTimeDuration = 0,
  isFadingAvailable = false,
}: RedirectActionParams) => {
  try {
    if (!isValidUrl(redirectToUrl)) {
      console.error('Invalid URL provided:', redirectToUrl);
      return;
    }

    if (isFadingAvailable && fadeOutDuration) {
      applyFadeOut(Player.avatar, fadeOutDuration);
    }

    const delay = holdTimeDuration * 1000;

    setTimeout(() => {
      performRedirection(redirectMode, redirectToUrl);
    }, delay);
  } catch (error) {
    console.error('Redirection failed -', (error as Error).message);
  }
};
