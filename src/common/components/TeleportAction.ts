import { Vector3 } from 'three';
import { Player, Component3D } from '@oo/scripting';

import fadeIn from '../effects/FadeIn.ts';
import fadeOut from '../effects/FadeOut.ts';

interface TeleportActionInputParams {
  fadeInDuration?: number;
  fadeOutDuration?: number;
  holdTimeDuration?: number;
  isFadingAvailable?: boolean;
  targetComponent: Component3D;
}

const applyFadeOut = (targetComponent: Component3D, duration: number) => {
  fadeOut({ targetComponent, duration });
};

const teleportAvatar = (targetComponent: Component3D) => {
  const targetPosition = targetComponent.position;
  const dimension = targetComponent.getDimensions();

  const targetVector = new Vector3(
    targetPosition.x,
    targetPosition.y + dimension.y / 2,
    targetPosition.z,
  );

  Player.avatar.rigidBody.teleport(targetVector, targetComponent.quaternion);
  console.log('Teleportation successful.');
};

const applyFadeIn = (targetComponent: Component3D, duration: number) => {
  fadeIn({ targetComponent, duration });
};

export default ({
  fadeInDuration,
  targetComponent,
  fadeOutDuration,
  holdTimeDuration = 0,
  isFadingAvailable = false,
}: TeleportActionInputParams): void => {
  const delay = holdTimeDuration * 1000;

  try {
    if (isFadingAvailable && fadeOutDuration) {
      applyFadeOut(Player.avatar, fadeOutDuration);
    }

    setTimeout(() => {
      teleportAvatar(targetComponent);

      if (isFadingAvailable && fadeInDuration) {
        applyFadeIn(Player.avatar, fadeInDuration);
      }
    }, delay);
  } catch (error) {
    console.error(`Teleportation failed to ${targetComponent.name || 'unknown target'}:`, error);
  }
};
