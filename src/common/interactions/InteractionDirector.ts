import { Component3D, Components, Player } from '@oo/scripting';

export interface InteractionAdjustment {
  x: number;
  y: number;
  z: number;
}

export interface InteractionDirectorOptionParams {
  triggerDistance?: number;
  interactionAdjustment: InteractionAdjustment;
  isActiveMultipleTimes: boolean;
}

interface InteractionDirectorParams {
  host: Component3D;
  triggerKey: string;
  options?: Record<string, any>;
}

export default class InteractionDirector {
  /**
   * Handles the interaction based on the specified interaction mode.
   * @param {InteractionDirectorParams} params - Parameters for the interaction.
   * @param {(callback?: (response: boolean) => void) => void} handleInteractionStart - The action to be executed when entering the interaction range.
   * @param {() => void} handleInteractionEnd - The action to be executed when exiting the interaction range.
   * @param {InteractionDirectorOptionParams} options - Options to configure the interaction.
   */
  static async handle(
    params: InteractionDirectorParams,
    handleInteractionStart: (callback?: (response: boolean) => void) => void,
    handleInteractionEnd: () => void,
    options?: InteractionDirectorOptionParams,
  ) {
    const director = new InteractionDirector();

    switch (params.options?.interactionMode) {
      case 'Key':
        await director.createKeyInteraction(params, handleInteractionStart, options);
        break;
      case 'Auto':
        await director.createProximityInteraction(
          params,
          handleInteractionStart,
          handleInteractionEnd,
          options,
        );
        break;
      default:
        throw new Error('Unknown interaction mode');
    }
  }

  /**
   * Creates an interaction triggered by a key press.
   * @param {InteractionDirectorParams} params - Parameters for the interaction.
   * @param {(callback?: (response: boolean) => void) => void} onInteractionSuccess - Action to execute upon interaction success.
   * @param {InteractionDirectorOptionParams} options - Interaction configuration options.
   */
  private async createKeyInteraction(
    { triggerKey, host }: InteractionDirectorParams,
    onInteractionSuccess: (callback?: (response: boolean) => void) => void,
    options?: InteractionDirectorOptionParams,
  ) {
    try {
      const interaction = await Components.create({
        active: true,
        type: 'interaction',
        key: `Key${triggerKey.toUpperCase()}`,
        distanceTarget: Player.avatar.position,
        distance: options?.triggerDistance || 0,
        atlas: `keyboard_${triggerKey.toLowerCase()}_outline`,
      });

      this.updateInteractionPosition({ interaction, host, options });

      interaction.onInteraction(() => {
        onInteractionSuccess(response => {
          if (response && !options?.isActiveMultipleTimes) {
            interaction.destroy();
          }
        });
      });
    } catch (error) {
      console.error('Failed to create key interaction:', error);
    }
  }

  /**
   * Creates an automatic interaction based on proximity.
   * @param {InteractionDirectorParams} params - Parameters for the interaction.
   * @param {(callback?: (response: boolean) => void) => void} onInteractionEnter - Action to execute when entering the interaction range.
   * @param {() => void} onInteractionExit - Action to execute when exiting the interaction range.
   * @param {InteractionDirectorOptionParams} options - Interaction configuration options.
   */
  private async createProximityInteraction(
    { host }: InteractionDirectorParams,
    onInteractionEnter: (callback?: (response: boolean) => void) => void,
    onInteractionExit: () => void,
    options?: InteractionDirectorOptionParams,
  ) {
    host.onSensorEnter(() => {
      onInteractionEnter(response => {
        if (response && !options?.isActiveMultipleTimes) {
          host.collider.enabled = false;
        }
      });
    });

    host.onSensorExit(onInteractionExit);
  }

  /**
   * Updates the position of the interaction relative to a host component.
   * @param {object} params - Parameters for updating the interaction position.
   * @param {any} params.interaction - The interaction to update.
   * @param {Component3D} params.host - The 3D component whose position is used as the reference.
   * @param {InteractionDirectorOptionParams} options - Options to configure the position adjustment.
   */
  private updateInteractionPosition({
    host,
    interaction,
    options,
  }: {
    interaction: any; // TODO: Setup oo-oncyber.d.ts to avoid issues from the linter
    host: Component3D;
    options?: InteractionDirectorOptionParams;
  }) {
    interaction.position.copy(host.position);
    interaction.position.x =
      host.position.x + host.getDimensions().x + (options?.interactionAdjustment.x || 0);
    interaction.position.y =
      host.position.y + host.getDimensions().y + (options?.interactionAdjustment.y || 0);
    interaction.position.z =
      host.position.z + host.getDimensions().z + (options?.interactionAdjustment.z || 0);
  }
}
