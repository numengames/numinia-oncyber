import { Component3D, Components, Player } from '@oo/scripting';

/**
 * Parameters for configuring an interaction in the InteractionDirector.
 */
interface InteractionDirectorParams {
  /**
   * Optional distance within which the interaction is active.
   */
  distance?: number;

  /**
   * The 3D component that serves as the reference for the interaction's position.
   */
  host: Component3D;

  /**
   * The key that triggers the interaction.
   */
  triggerKey: string;

  /**
   * Adjustment to the Y position of the interaction.
   */
  yInteractionAdjustment: number;
}

/**
 * Manages and creates interactions in the environment, such as key-triggered or proximity-based interactions.
 */
export default class InteractionDirector {
  /**
   * Handles the interaction based on the specified interaction mode.
   * @param {any} context - The context containing interaction mode and other parameters.
   * @param {() => void} action - The action to be executed when the interaction is triggered.
   */
  static async handle(context: any, action: () => void) {
    const director = new InteractionDirector();

    switch (context.interactionMode) {
      case 'Key':
        await director.createInteractionByKey(context, action);
        break;
      case 'Auto':
        await director.createInteractionAuto(context, action);
        break;
      default:
        return;
    }
  }

  /**
   * Creates an interaction that is triggered by a key press.
   * @param {InteractionDirectorParams} params - The parameters for creating the key-triggered interaction.
   * @param {() => void} action - The action to be executed when the interaction is triggered.
   */
  private async createInteractionByKey(
    { distance, triggerKey, host, yInteractionAdjustment }: InteractionDirectorParams,
    action: () => void,
  ) {
    const interaction = await Components.create({
      distance,
      type: 'interaction',
      distanceTarget: Player.avatar.position,
      atlas: `keyboard_${triggerKey.toLowerCase()}_outline`,
      key: `Key${triggerKey.toUpperCase()}`,
    });

    this.updateInteractionPosition({ interaction, host, yInteractionAdjustment });

    interaction.active = true;

    interaction.onInteraction(action.bind(this));
  }

  /**
   * Creates an automatic interaction based on proximity.
   * @param {InteractionDirectorParams} params - The parameters for creating the proximity-based interaction.
   * @param {() => void} action - The action to be executed when the interaction is triggered.
   */
  private async createInteractionAuto({ host }: InteractionDirectorParams, action: () => void) {
    host.onSensorEnter(async () => action);
  }

  /**
   * Updates the position of the interaction relative to a host component.
   * @param {object} params - The parameters for updating the interaction position.
   * @param {any} params.interaction - The interaction to update.
   * @param {Component3D} params.host - The 3D component whose position is used as the reference.
   * @param {number} [params.yInteractionAdjustment=0] - Additional offset to adjust the Y position.
   */
  private updateInteractionPosition({
    interaction,
    host,
    yInteractionAdjustment = 0,
  }: {
    interaction: any; //TODO: Explore how to setup oo-oncyber.d.ts to allow here ScriptComponent avoiding issues from the linter
    host: Component3D;
    yInteractionAdjustment?: number;
  }) {
    interaction.position.copy(host.position);
    interaction.position.y = host.position.y + host.getDimensions().y + yInteractionAdjustment;
  }
}
