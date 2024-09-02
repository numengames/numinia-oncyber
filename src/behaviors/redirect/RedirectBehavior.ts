import { Folder, Param, ScriptBehavior } from '@oo/scripting';

import RedirectAction from '../../common/components/RedirectAction.ts';
import InteractionDirector from '../../common/interactions/InteractionDirector.ts';

interface RedirectBehaviorParams {
  triggerKey: string;
  redirectToUrl: string;
  redirectAction: string;
  interactionMode: string;
  triggerDistance: number;
  fadeOutDuration: number;
  isFadingAvailable: boolean;
  interactionHoldTime: number;
  yInteractionAdjustment: number;
}

/**
 * Main class to handle redirect behavior in the script.
 */
export default class RedirectBehavior extends ScriptBehavior {
  static config = {
    title: 'Behavior - Redirect',
    description: 'A behavior to redirect to another space or URL',
    tip: 'Use this if you wanna change or open the navigator with a new URL',
  };

  @Param({ type: 'string', name: 'Web URL' })
  private redirectToUrl = '';

  @Param({
    type: 'select',
    options: ['New tab', 'Existing'],
    name: 'Redirect or open in new tab',
  })
  private redirectMode = 'Existing';

  @Folder('Interaction Mode')
  @Param({
    type: 'select',
    name: 'Interaction Mode',
    options: ['Auto', 'Key'],
  })
  private interactionMode = 'Auto';
  @Param({
    type: 'string',
    name: 'Trigger key',
    visible: (params: RedirectBehaviorParams) => params.interactionMode === 'Key',
  })
  private triggerKey = 'E';
  @Param({
    step: 0.1,
    type: 'number',
    name: 'Key dialog adjustment',
    visible: (params: RedirectBehaviorParams) => params.interactionMode === 'Key',
  })
  private yInteractionAdjustment = 0;
  @Param({
    min: 0.1,
    step: 0.1,
    type: 'number',
    defaultValue: 2,
    name: 'Trigger distance',
    visible: (params: RedirectBehaviorParams) => params.interactionMode === 'Key',
  })
  private triggerDistance = 2;

  @Folder('Animations')
  @Param({ type: 'boolean', defaultValue: false, name: 'Enable fadeIn - fadeOut' })
  private isFadingAvailable = false;
  @Param({
    min: 0.1,
    step: 0.1,
    type: 'number',
    name: 'FadeOut duration',
    visible: (params: RedirectBehaviorParams) => params.isFadingAvailable === true,
  })
  private fadeOutDuration = 0;
  @Param({
    min: 0,
    step: 0.1,
    type: 'number',
    defaultValue: 1,
    name: 'Teleport delay (seconds)',
    visible: (params: RedirectBehaviorParams) => params.isFadingAvailable === true,
  })
  private interactionHoldTime = 0;

  /**
   * Called when the script is ready.
   */
  onReady = async () => {
    await InteractionDirector.handle(this, this.redirectAction.bind(this));
  };

  /**
   * Executes the redirect action.
   */
  private redirectAction() {
    RedirectAction({
      redirectMode: this.redirectMode,
      redirectToUrl: this.redirectToUrl,
      fadeOutDuration: this.fadeOutDuration,
      isFadingAvailable: this.isFadingAvailable,
      holdTimeDuration: this.interactionHoldTime,
    });
  }
}
