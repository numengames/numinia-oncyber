import { Component3D, Receiver, Param, ScriptBehavior, Folder } from '@oo/scripting';

const goToAnotherSpace = (url: string, mode: string): void => {
  const newWindow = window.open(url, mode);

  if (newWindow) {
    newWindow.focus();
  } else {
    console.error('Failed to open new window or tab.');
  }
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

  @Param({
    min: 0,
    step: 0.1,
    type: 'number',
    defaultValue: 1,
    name: 'Receiver execution delay (in seconds)',
  })
  private holdTimeDuration = 0;

  @Folder('Signal Receiver')
  @Receiver()
  run() {
    try {
      if (!this.redirectToUrl) {
        console.error('You have to provide a URL:', this.redirectToUrl);
        return;
      }

      const parsedUrl = new URL(this.redirectToUrl);

      const delay = this.holdTimeDuration * 1000;

      setTimeout(() => {
        performRedirection(this.redirectMode, parsedUrl.toString());
      }, delay);
    } catch (error) {
      console.error('Redirect receiver failed -', (error as Error).message);
    }
  }
}
