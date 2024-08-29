import { Folder, Param, $Param, ScriptBehavior } from '@oo/scripting';

import TeleportAction from '../../common/components/TeleportAction.ts';
import InteractionDirector from '../../common/utils/InteractionDirector.ts';

interface TeleportBehaviorInteractionModeInterfaceParams {
  triggerKey: string;
  secondsDelay: number;
  interactionMode: string;
  triggerDistance: number;
  teleportToComponentId: string;
}

interface TeleportBehaviorAnimationsInterfaceParams {
  fadeInDuration: number;
  fadeOutDuration: number;
  isFadingAvailable: boolean;
  interactionHoldTime: number;
}

/**
 * Main class to handle teleportation behavior in the script.
 */
export default class TeleportBehavior extends ScriptBehavior {
  static config = {
    title: 'Behavior - Teleport',
    description: 'A behavior to teleport the avatar to a component',
    tip: 'Use this to move the avatar between the space objects.',
  };

  @Param({
    type: 'component',
    name: 'Component target',
  })
  private componentTarget = $Param.Component('any');

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
    visible: (params: TeleportBehaviorInteractionModeInterfaceParams) =>
      params.interactionMode === 'Key',
  })
  private triggerKey = 'E';
  @Param({
    step: 0.1,
    type: 'number',
    name: 'Key dialog adjustment',
    visible: (params: TeleportBehaviorInteractionModeInterfaceParams) =>
      params.interactionMode === 'Key',
  })
  private yInteractionAdjustment = 0;
  @Param({
    min: 0.1,
    step: 0.1,
    type: 'number',
    defaultValue: 2,
    name: 'Trigger distance',
    visible: (params: TeleportBehaviorInteractionModeInterfaceParams) =>
      params.interactionMode === 'Key',
  })
  private triggerDistance = 2;

  @Folder('Animations')
  @Param({ type: 'boolean', defaultValue: false, name: 'Enable fadeIn - fadeOut' })
  private isFadingAvailable = false;
  @Param({
    min: 0.1,
    step: 0.1,
    type: 'number',
    name: 'FadeIn duration',
    visible: (params: TeleportBehaviorAnimationsInterfaceParams) =>
      params.isFadingAvailable === true,
  })
  private fadeInDuration = 1;
  @Param({
    min: 0.1,
    step: 0.1,
    type: 'number',
    name: 'FadeOut duration',
    visible: (params: TeleportBehaviorAnimationsInterfaceParams) =>
      params.isFadingAvailable === true,
  })
  private fadeOutDuration = 1;
  @Param({
    min: 0,
    step: 0.1,
    type: 'number',
    defaultValue: 1,
    name: 'Teleport delay (seconds)',
    visible: (params: TeleportBehaviorAnimationsInterfaceParams) =>
      params.isFadingAvailable === true,
  })
  private interactionHoldTime = 0;

  /**
   * Called when the script is ready.
   */
  onReady = async () => {
    await InteractionDirector.handle(this, this.teleportAction.bind(this));
  };

  /**
   * Executes the teleportation action.
   */
  private teleportAction() {
    TeleportAction({
      fadeInDuration: this.fadeInDuration,
      targetComponent: this.componentTarget,
      fadeOutDuration: this.fadeOutDuration,
      isFadingAvailable: this.isFadingAvailable,
    });
  }
}
