import { Folder, Param, $Param, ScriptBehavior } from '@oo/scripting';

import InteractionDirector, {
  InteractionDirectorOptionParams,
} from '../../common/interactions/InteractionDirector';

interface BaseEmitterParams {
  triggerKey?: string;
  interactionMode: string;
  triggerDistance?: number;
  xInteractionAdjustment?: number;
  yInteractionAdjustment?: number;
  zInteractionAdjustment?: number;
}

/**
 * Main class to handle the action in the script.
 */
export default class BaseEmitter extends ScriptBehavior {
  static config = {
    title: 'Emitter',
    tip: 'Use this to launch an event after interacting with the 3D Object',
  };

  @Param({ name: 'Signal sender' })
  private senderSignal = $Param.Signal();

  @Param({ type: 'boolean', defaultValue: false, name: 'Can emit signals multiple times?' })
  private isActiveMultipleTimes = false;

  @Folder('Interaction Mode')
  @Param({
    type: 'select',
    defaultValue: 'Auto',
    name: 'Interaction Mode',
    options: ['Auto', 'Key'],
  })
  private interactionMode = 'Auto';

  @Param({
    type: 'string',
    name: 'Trigger key',
    visible: (params: BaseEmitterParams) => params.interactionMode === 'Key',
  })
  private triggerKey = 'E';

  @Param({
    min: -20,
    step: 0.1,
    type: 'number',
    name: 'X Key dialog adjustment',
    visible: (params: BaseEmitterParams) => params.interactionMode === 'Key',
  })
  private xInteractionAdjustment = 0;

  @Param({
    min: -20,
    step: 0.1,
    type: 'number',
    name: 'Y Key dialog adjustment',
    visible: (params: BaseEmitterParams) => params.interactionMode === 'Key',
  })
  private yInteractionAdjustment = 0;

  @Param({
    min: -20,
    step: 0.1,
    type: 'number',
    name: 'Z Key dialog adjustment',
    visible: (params: BaseEmitterParams) => params.interactionMode === 'Key',
  })
  private zInteractionAdjustment = 0;

  @Param({
    min: 0.1,
    step: 0.1,
    type: 'number',
    defaultValue: 2,
    name: 'Trigger distance',
    visible: (params: BaseEmitterParams) => params.interactionMode === 'Key',
  })
  private triggerDistance = 2;

  private options?: InteractionDirectorOptionParams;

  /**
   * Called when the script is ready.
   */
  onReady = async () => {
    this.options = {
      interactionAdjustment: {
        x: this.xInteractionAdjustment,
        y: this.yInteractionAdjustment,
        z: this.zInteractionAdjustment,
      },
      triggerDistance: this.triggerDistance,
      isActiveMultipleTimes: this.isActiveMultipleTimes,
    };

    await InteractionDirector.handle(
      {
        host: this.host,
        triggerKey: this.triggerKey,
        options: { interactionMode: this.interactionMode },
      },
      this.handleInteractionStart.bind(this),
      this.handleInteractionEnd.bind(this),
      this.options,
    );
  };

  /**
   * Handles what happens when the interaction starts.
   * @param {Function} callback - Optional callback to notify success or failure.
   */
  private handleInteractionStart(callback?: (response: boolean) => void) {
    if (callback) {
      callback(true);
    }
    this.senderSignal.emit();
  }

  /**
   * Handles what happens when the interaction ends.
   */
  private handleInteractionEnd() {}
}
