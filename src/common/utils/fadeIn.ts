import anime from 'animejs';
import { Component3D } from '@oo/scripting';

interface FadeInInputParams {
  easing?: string;
  opacity?: number;
  duration?: number;
  target: Component3D;
}

export default ({ target, duration = 0, opacity = 1, easing = 'linear' }: FadeInInputParams) => {
  anime({
    easing,
    opacity,
    targets: target,
    duration: duration * 1000,
  });
};