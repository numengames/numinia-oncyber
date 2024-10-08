import { ScriptBehavior, Component3D, Receiver, Folder, Param, $Param } from '@oo/scripting';

import anime from 'animejs';

export default class TranslateReceiver extends ScriptBehavior<Component3D> {
  @Param({
    min: 0,
    step: 0.1,
    type: 'number',
    defaultValue: 0,
    name: 'Receiver execution delay (in seconds)',
  })
  private holdTimeDuration = 0;

  @Param({ name: 'Log signal sender' })
  private logSignalSender = $Param.Signal();

  @Folder('Translate Receiver Config')
  @Param({
    step: 0.1,
    max: 1000,
    min: -1000,
    type: 'number',
    defaultValue: 0,
    name: 'Translate to X axis',
  })
  private positionX = 0;

  @Param({
    step: 0.1,
    max: 1000,
    min: -1000,
    type: 'number',
    defaultValue: 0,
    name: 'Translate to Y axis',
  })
  private positionY = 0;

  @Param({
    step: 0.1,
    max: 1000,
    min: -1000,
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

    try {
      setTimeout(() => {
        anime({
          easing: this.easing,
          targets: this.host.position,
          duration: this.duration * 1000,
          x: this.host.position.x + this.positionX,
          y: this.host.position.y + this.positionY,
          z: this.host.position.z + this.positionZ,
        });

        this.logSignalSender.emit();
      }, delay);
    } catch (error) {
      console.error('Translate receiver failed', error);
    }
  }
}
