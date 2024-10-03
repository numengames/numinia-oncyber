import * as React from 'react';
import { Folder, Param, $Param, ScriptBehavior, UI } from '@oo/scripting';

import InsertPasswordPrompt from './InsertPasswordPrompt.tsx';
import InteractionDirector from '../../../common/interactions/InteractionDirector';

interface InsertPasswordEmitterParams {
  triggerKey?: string;
  interactionMode: string;
  triggerDistance?: number;
  yInteractionAdjustment?: number;
}

/**
 * Main class to handle the emitter in the script.
 */
export default class InsertPasswordEmitter extends ScriptBehavior {
  static config = {
    title: 'Emitter - Insert Password',
    tip: 'Use this to launch an event after solving the password',
  };

  private renderer = UI.createRenderer();

  @Param({ name: 'Signal sender' })
  private enterSignal = $Param.Signal();

  @Param({
    type: 'string',
    name: 'Master password'
  })
  private masterPassword = '';

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
    visible: (params: InsertPasswordEmitterParams) => params.interactionMode === 'Key',
  })

  private triggerKey = 'E';
  @Param({
    step: 0.1,
    type: 'number',
    name: 'Key dialog adjustment',
    visible: (params: InsertPasswordEmitterParams) => params.interactionMode === 'Key',
  })
  private yInteractionAdjustment = 0;
  @Param({
    min: 0.1,
    step: 0.1,
    type: 'number',
    defaultValue: 2,
    name: 'Trigger distance',
    visible: (params: InsertPasswordEmitterParams) => params.interactionMode === 'Key',
  })
  private triggerDistance = 2;

  onReady = async () => {
    await InteractionDirector.handle(this, this.showInsertPassword.bind(this));
  };

  private showInsertPassword() {
    this.renderer.render(
      <InsertPasswordPrompt
        key={new Date().getTime()}
        masterPassword={this.masterPassword}
        onSuccess={this.handleSolvedPassword}
      />
    );
  }

  private handleSolvedPassword = () => {
    this.passwordSolvedSignal.emit()
  }
}
