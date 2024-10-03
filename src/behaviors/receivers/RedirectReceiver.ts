import { Player, Component3D, Receiver, Param, ScriptBehavior, Folder } from '@oo/scripting';

import fadeOut from '../../common/utils/fadeOut';
import isValidUrl from '../../common/utils/isValidUrl';

interface RedirectReceiverParams {
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

const applyFadeOut = (target: Component3D, duration: number): void => {
  fadeOut({ target, duration });
};

const performRedirection = (redirectMode: string, redirectToUrl: string) => {
  if (redirectMode === 'Existing') {
    window.location.href = redirectToUrl;
  } else {
    goToAnotherSpace(redirectToUrl, redirectMode);
  }
};

export default class RedirectReceiver extends ScriptBehavior<Component3D> {
  @Param({ type: 'string', name: 'Web URL' })
  private redirectToUrl = '';

  @Param({
    type: 'select',
    options: ['New tab', 'Existing'],
    name: 'Redirect or open in new tab',
  })
  private redirectMode = 'Existing';

  @Param({ type: 'boolean', defaultValue: false, name: 'Enable fadeIn - fadeOut' })
  private isFadingAvailable = false;

  @Param({
    min: 0.1,
    step: 0.1,
    type: 'number',
    name: 'FadeOut duration',
    visible: (params: RedirectReceiverParams) => params.isFadingAvailable === true,
  })
  private fadeOutDuration = 0;
  @Param({
    min: 0,
    step: 0.1,
    type: 'number',
    defaultValue: 1,
    name: 'Receiver execution delay (in seconds)',
    visible: (params: RedirectReceiverParams) => params.isFadingAvailable === true,
  })
  private holdTimeDuration = 0;

  @Folder('Signal Receiver')
  @Receiver()
  run() {
    try {
      if (!isValidUrl(this.redirectToUrl)) {
        console.error('Invalid URL provided:', this.redirectToUrl);
        return;
      }

      if (this.isFadingAvailable && this.fadeOutDuration) {
        applyFadeOut(Player.avatar, this.fadeOutDuration);
      }

      const delay = this.holdTimeDuration * 1000;

      setTimeout(() => {
        performRedirection(this.redirectMode, this.redirectToUrl);
      }, delay);
    } catch (error) {
      console.error('Redirection failed -', (error as Error).message);
    }
  }
}
