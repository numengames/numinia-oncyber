import * as React from 'react';
import { Folder, Param, $Param, ScriptBehavior, UI } from '@oo/scripting';

import InsertPasswordPrompt from './InsertPasswordPrompt';
import InteractionDirector, {
  InteractionDirectorOptionParams,
} from '../../../common/interactions/InteractionDirector.ts';

interface InsertPasswordEmitterParams {
  triggerKey?: string;
  interactionMode: string;
  triggerDistance?: number;
  xInteractionAdjustment?: number;
  yInteractionAdjustment?: number;
  zInteractionAdjustment?: number;
}

export default class InsertPasswordEmitter extends ScriptBehavior {
  static config = {
    title: 'Emitter - Insert Password',
    tip: 'Use this to launch an event after solving the password',
  };

  private renderer = UI.createRenderer();

  @Param({ name: 'Password solved signal sender' })
  private passwordSolvedSignal = $Param.Signal();

  @Param({ name: 'Password error signal sender' })
  private passwordErrorSignal = $Param.Signal();

  @Param({
    type: 'string',
    name: 'Master password',
  })
  private masterPassword = '';

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
    visible: (params: InsertPasswordEmitterParams) => params.interactionMode === 'Key',
  })
  private triggerKey = 'E';

  @Param({
    min: -20,
    step: 0.1,
    type: 'number',
    name: 'X Key dialog adjustment',
    visible: (params: InsertPasswordEmitterParams) => params.interactionMode === 'Key',
  })
  private xInteractionAdjustment = 0;

  @Param({
    min: -20,
    step: 0.1,
    type: 'number',
    name: 'Y Key dialog adjustment',
    visible: (params: InsertPasswordEmitterParams) => params.interactionMode === 'Key',
  })
  private yInteractionAdjustment = 0;

  @Param({
    min: -20,
    step: 0.1,
    type: 'number',
    name: 'Z Key dialog adjustment',
    visible: (params: InsertPasswordEmitterParams) => params.interactionMode === 'Key',
  })
  private zInteractionAdjustment = 0;

  @Param({
    min: 0.1,
    step: 0.1,
    type: 'number',
    defaultValue: 2,
    name: 'Trigger distance',
    visible: (params: InsertPasswordEmitterParams) => params.interactionMode === 'Key',
  })
  private triggerDistance = 2;

  private options?: InteractionDirectorOptionParams;

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

    try {
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
    } catch (error) {
      console.error('Error handling interaction:', error);
    }
  };

  private handleInteractionStart(callback?: (response: boolean) => void) {
    const handleSolvedPassword = () => {
      if (callback) {
        callback(true);
      }
      this.passwordSolvedSignal.emit();
    };

    this.renderer.render(
      <InsertPasswordPrompt
        key={new Date().getTime()}
        onError={this.handleErrorPassword.bind(this)}
        masterPassword={this.masterPassword}
        onSuccess={handleSolvedPassword.bind(this)}
      />,
    );
  }

  private handleInteractionEnd() {
    this.hidePasswordPrompt();
  }

  private hidePasswordPrompt() {
    this.renderer.render(null);
  }

  private handleErrorPassword() {
    this.passwordErrorSignal.emit();
  }
}
