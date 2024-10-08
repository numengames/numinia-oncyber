import anime from 'animejs';
import { Player, Component3D, Receiver, Param, ScriptBehavior, Folder } from '@oo/scripting';

export default class FadeInReceiver extends ScriptBehavior<Component3D> {
  @Param({
    min: 0,
    step: 0.1,
    type: 'number',
    defaultValue: 0,
    name: 'Duration',
  })
  private duration = 0;
  @Param({
    min: 0,
    max: 1,
    step: 0.1,
    type: 'number',
    name: 'Opacity',
    defaultValue: 1,
  })
  private opacity = 1;
  @Param({
    min: 0,
    step: 0.1,
    type: 'number',
    defaultValue: 0,
    name: 'Execution delay (in seconds)',
  })
  private holdTimeDuration = 0;
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

  @Folder('Signal Receiver')
  @Receiver()
  run() {
    try {
      const delay = this.holdTimeDuration * 1000;

      const target = this.host.name.includes('Avatar Picker') ? Player.avatar : this.host;

      setTimeout(() => {
        anime({
          targets: target,
          easing: this.easing,
          opacity: this.opacity,
          duration: this.duration * 1000,
        });
      }, delay);
    } catch (error) {
      console.error('FadeInReceiver failed -', (error as Error).message);
    }
  }
}
