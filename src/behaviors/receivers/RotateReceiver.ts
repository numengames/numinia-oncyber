import { ScriptBehavior, Component3D, Receiver, Folder, Param } from '@oo/scripting';

import anime from 'animejs';

export default class RotateReceiver extends ScriptBehavior<Component3D> {
  @Param({
    min: 0,
    step: 0.1,
    type: 'number',
    defaultValue: 1,
    name: 'Receiver execution delay (in seconds)',
  })
  private holdTimeDuration = 0;

  @Folder('Rotate Action Config')
  @Param({
    min: 0,
    max: 360,
    step: 0.1,
    type: 'number',
    defaultValue: 0,
    name: 'Rotation X axis',
  })
  private rotationX = 0;
  @Param({
    min: 0,
    max: 360,
    step: 0.1,
    type: 'number',
    defaultValue: 0,
    name: 'Rotation Y axis',
  })
  private rotationY = 0;
  @Param({
    min: 0,
    max: 360,
    step: 0.1,
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

  @Folder()
  @Param({
    type: 'select',
    name: 'Easing',
    defaultValue: 'linear',
    options: ['linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInExpo', 'easeOutExpo', 'easeInOutExpo', 'easeInBack', 'easeOutBack', 'easeInOutBack', 'easeInElastic', 'easeOutElastic', 'easeInOutElastic', 'easeInBounce', 'easeOutBounce', 'easeInOutBounce']
  })
  private easing = 'linear';

  @Receiver()
  run() {
    const delay = this.holdTimeDuration * 1000;

    setTimeout(() => {
      anime({
        easing: this.easing,
        targets: this.host.rotation,
        duration: this.duration * 1000,
        rotateX: this.host.rotation.x + this.rotationX * (Math.PI / 180),
        rotateY: this.host.rotation.y + this.rotationY * (Math.PI / 180),
        rotateZ: this.host.rotation.z + this.rotationZ * (Math.PI / 180),
      });
    }, delay);
  }
}
