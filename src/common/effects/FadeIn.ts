import gsap from 'gsap';

interface FadeInInputParams {
  opacity?: number;
  duration?: number;
  targetComponent: any;
}

export default ({ targetComponent, duration = 0, opacity = 1 }: FadeInInputParams) => {
  gsap.to(targetComponent, {
    opacity,
    duration,
  });
};
