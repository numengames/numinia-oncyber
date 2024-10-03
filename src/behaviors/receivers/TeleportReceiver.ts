import {
  Param,
  Player,
  Folder,
  $Param,
  Receiver,
  Component3D,
  ScriptBehavior,
} from '@oo/scripting';
import { Vector3 } from 'three';

import fadeIn from '../../common/utils/fadeIn';
import fadeOut from '../../common/utils/fadeOut';

interface TeleportReceiverInputParams {
  fadeInDuration?: number;
  fadeOutDuration?: number;
  holdTimeDuration?: number;
  isFadingAvailable?: boolean;
  targetComponent: Component3D;
}

const applyFadeOut = (target: Component3D, duration: number) => {
  fadeOut({ target, duration });
};

const applyFadeIn = (target: Component3D, duration: number) => {
  fadeIn({ target, duration });
};

export default class TeleportReceiver extends ScriptBehavior<Component3D> {
  @Param({
    type: 'component',
    name: 'Component target',
  })
  private targetComponent = $Param.Component('any');

  @Folder('Animations')
  @Param({ type: 'boolean', defaultValue: false, name: 'Enable fadeIn - fadeOut' })
  private isFadingAvailable = false;
  @Param({
    min: 0.1,
    step: 0.1,
    type: 'number',
    name: 'FadeIn duration',
    visible: (params: TeleportReceiverInputParams) => params.isFadingAvailable === true,
  })
  private fadeInDuration = 0;
  @Param({
    min: 0.1,
    step: 0.1,
    type: 'number',
    name: 'FadeOut duration',
    visible: (params: TeleportReceiverInputParams) => params.isFadingAvailable === true,
  })
  private fadeOutDuration = 0;
  @Param({
    min: 0,
    step: 0.1,
    type: 'number',
    defaultValue: 1,
    name: 'Receiver execution delay (in seconds)',
    visible: (params: TeleportReceiverInputParams) => params.isFadingAvailable === true,
  })
  private holdTimeDuration = 0;

  private teleportAvatar(target: Component3D) {
    const targetPosition = this.targetComponent.position;
    const dimension = this.targetComponent.getDimensions();

    const targetVector = new Vector3(
      targetPosition.x,
      targetPosition.y + dimension.y / 2,
      targetPosition.z,
    );

    target.rigidBody.teleport(targetVector, this.targetComponent.quaternion);
  }

  @Folder('Signal Receiver')
  @Receiver()
  run(): void {
    const target = this.host.name.includes('Avatar Picker') ? Player.avatar : this.host;

    try {
      if (!target.rigidBody) {
        throw new Error('Collider must be activated to have rigidBody property available');
      }

      if (this.isFadingAvailable && this.fadeOutDuration) {
        applyFadeOut(target, this.fadeOutDuration);
      }

      const delay = this.holdTimeDuration * 1000;

      setTimeout(() => {
        this.teleportAvatar(target);

        if (this.isFadingAvailable && this.fadeInDuration) {
          applyFadeIn(target, this.fadeInDuration);
        }
      }, delay);
    } catch (error) {
      console.error(
        `Teleportation failed to ${this.targetComponent.name || 'unknown target'}:`,
        error,
      );
    }
  }
}
