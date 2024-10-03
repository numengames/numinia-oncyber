import { ScriptBehavior, Component3D, Receiver, Folder, Param } from '@oo/scripting';

import anime from 'animejs';

export default class TranslateReceiver extends ScriptBehavior<Component3D> {
  @Param({
    min: 0,
    step: 0.1,
    type: 'number',
    defaultValue: 1,
    name: 'Receiver execution delay (in seconds)',
  })
  private holdTimeDuration = 0;

  @Folder('Translate Receiver Config')
  @Param({
    min: 0,
    max: 360,
    step: 0.1,
    type: 'number',
    defaultValue: 0,
    name: 'Translate to X axis',
  })
  private positionX = 0;
  @Param({
    min: 0,
    max: 360,
    step: 0.1,
    type: 'number',
    defaultValue: 0,
    name: 'Translate to Y axis',
  })
  private positionY = 0;
  @Param({
    min: 0,
    max: 360,
    step: 0.1,
    type: 'number',
    defaultValue: 0,
    name: 'Translate to Z axis',
  })
  private positionZ = 0;
  @Param({
    min: 0,
    max: 20,
    step: 0.1,
    type: 'number',
    defaultValue: 0.5,
    name: 'translate duration',
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

    setTimeout(() => {
      anime({
        easing: this.easing,
        targets: this.host.position,
        duration: this.duration * 1000,
        translateX: this.host.position.x + this.positionX,
        translateY: this.host.position.y + this.positionY,
        translateZ: this.host.position.z + this.positionZ,
      });
    }, delay);
  }
}
