import gsap from 'gsap';

interface FadeOutInputParams {
  opacity?: number;
  duration?: number;
  targetComponent: any;
}

export default ({ targetComponent, duration = 0, opacity = 0 }: FadeOutInputParams) => {
  gsap.to(targetComponent, {
    opacity,
    duration,
  });
};
