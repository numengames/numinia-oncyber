import { ScriptBehavior, Component3D, Receiver, Folder, Param } from '@oo/scripting';

import anime from 'animejs';

export default class RotateReceiver extends ScriptBehavior<Component3D> {
  @Param({
    min: 0,
    step: 0.1,
    type: 'number',
    defaultValue: 0,
    name: 'Receiver execution delay (in seconds)',
  })
  private holdTimeDuration = 0;

  @Folder('Rotate Action Config')
  @Param({
    step: 0.1,
    max: 360,
    min: -360,
    type: 'number',
    defaultValue: 0,
    name: 'Rotation X axis',
  })
  private rotationX = 0;

  @Param({
    step: 0.1,
    max: 360,
    min: -360,
    type: 'number',
    defaultValue: 0,
    name: 'Rotation Y axis',
  })
  private rotationY = 0;

  @Param({
    step: 0.1,
    max: 360,
    min: -360,
    type: 'number',
    defaultValue: 0,
    name: 'Rotation Z axis',
  })
  private rotationZ = 0;

  @Param({
    min: 0,
    max: 20,
    step: 0.1,
    type: 'number',
    defaultValue: 0.5,
    name: 'Rotation duration',
  })
  private duration = 0.5;

  @Param({
    type: 'select',
    name: 'Easing',
    defaultValue: 'linear',
    options: [
      'linear',
      'easeInQuad',
      'easeOutQuad',
      'easeInOutQuad',
      'easeInCubic',
      'easeOutCubic',
      'easeInOutCubic',
      'easeInQuart',
      'easeOutQuart',
      'easeInOutQuart',
      'easeInExpo',
      'easeOutExpo',
      'easeInOutExpo',
      'easeInBack',
      'easeOutBack',
      'easeInOutBack',
      'easeInElastic',
      'easeOutElastic',
      'easeInOutElastic',
      'easeInBounce',
      'easeOutBounce',
      'easeInOutBounce',
    ],
  })
  private easing = 'linear';

  @Receiver()
  run() {
    const delay = this.holdTimeDuration * 1000;

    try {
      setTimeout(() => {
        anime({
          easing: this.easing,
          targets: this.host.rotation,
          duration: this.duration * 1000,
          x: this.host.rotation.x + this.rotationX * (Math.PI / 180),
          y: this.host.rotation.y + this.rotationY * (Math.PI / 180),
          z: this.host.rotation.z + this.rotationZ * (Math.PI / 180),
        });
      }, delay);
    } catch (error) {
      console.error('Rotate receiver failed', error);
    }
  }
}
