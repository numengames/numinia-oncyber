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

import { addEventToQueue } from '../../common/state/appState';

export default class TeleportReceiver extends ScriptBehavior<Component3D> {
  @Param({
    type: 'component',
    name: 'Component target',
  })
  private targetComponent = $Param.Component('any');

  @Param({
    min: 0,
    step: 0.1,
    type: 'number',
    defaultValue: 1,
    name: 'Receiver execution delay (in seconds)',
  })
  private holdTimeDuration = 0;

  @Param({ name: 'Log signal sender' })
  private logSignalSender = $Param.Signal();

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

      addEventToQueue({
        eventType: 'teleport',
        objectId: this.host.name,
        message: `Teleported to ${this.targetComponent.name || 'unknown target'}`,
      });

      const delay = this.holdTimeDuration * 1000;

      setTimeout(() => {
        this.teleportAvatar(target);
        this.logSignalSender.emit();
      }, delay);
    } catch (error) {
      console.error(
        `Teleportation failed to ${this.targetComponent.name || 'unknown target'}:`,
        error,
      );
    }
  }
}
