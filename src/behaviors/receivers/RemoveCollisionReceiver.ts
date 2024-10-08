import { Component3D, Receiver, Param, ScriptBehavior, Folder } from '@oo/scripting';

export default class RemoveCollisionReceiver extends ScriptBehavior<Component3D> {
  @Param({
    min: 0,
    step: 0.1,
    type: 'number',
    defaultValue: 0,
    name: 'Receiver execution delay (in seconds)',
  })
  private holdTimeDuration = 0;

  @Folder('Signal Receiver')
  @Receiver()
  run() {
    try {
      const delay = this.holdTimeDuration * 1000;

      setTimeout(() => {
        this.host.collider.enabled = false;
      }, delay);
    } catch (error) {
      console.error('Remove collision receiver failed -', (error as Error).message);
    }
  }
}
