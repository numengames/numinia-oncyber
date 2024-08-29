import { Vector3 } from 'three';
import { Player, Component3D } from '@oo/scripting';

import fadeIn from '../effects/FadeIn.ts';
import fadeOut from '../effects/FadeOut.ts';

interface TeleportInputParams {
  fadeInDuration: number;
  fadeOutDuration: number;
  isFadingAvailable: boolean;
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
  isFadingAvailable,
}: TeleportInputParams): void => {
  try {
    isFadingAvailable ? applyFadeOut(Player.avatar, fadeOutDuration) : null;

    setTimeout(() => {
      teleportAvatar(targetComponent);
      isFadingAvailable ? applyFadeIn(Player.avatar, fadeInDuration) : null;
    }, fadeOutDuration * 1000);
  } catch (error) {
    console.error(`Teleportation failed to ${targetComponent.name || 'unknown target'}:`, error);
  }
};
