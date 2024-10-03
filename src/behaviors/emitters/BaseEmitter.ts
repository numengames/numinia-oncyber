import { Folder, Param, $Param, ScriptBehavior } from '@oo/scripting';

import InteractionDirector from '../../common/interactions/InteractionDirector';

interface BaseEmitterParams {
  triggerKey?: string;
  interactionMode: string;
  triggerDistance?: number;
  yInteractionAdjustment?: number;
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
  private enterSignal = $Param.Signal();

  @Param({ type: 'boolean', defaultValue: false, name: 'Can emit signals multiple times?' })
  private doesEmitMultipleTimes = false;

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
    step: 0.1,
    type: 'number',
    name: 'Key dialog adjustment',
    visible: (params: BaseEmitterParams) => params.interactionMode === 'Key',
  })
  private yInteractionAdjustment = 0;
  @Param({
    min: 0.1,
    step: 0.1,
    type: 'number',
    defaultValue: 2,
    name: 'Trigger distance',
    visible: (params: BaseEmitterParams) => params.interactionMode === 'Key',
  })
  private triggerDistance = 2;

  /**
   * Called when the script is ready.
   */
  onReady = async () => {
    await InteractionDirector.handle(this, () => this.enterSignal.emit());
  };
}
