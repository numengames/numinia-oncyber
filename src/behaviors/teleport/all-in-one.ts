import {
  Param,
  Folder,
  Player,
  $Param,
  Components,
  Component3D,
  ScriptBehavior,
} from '@oo/scripting';
import gsap from 'gsap';
import { Vector3 } from 'three';

interface TeleportInterfaceParams {
  triggerKey: string;
  fadeInDuration: number;
  interactionMode: string;
  triggerDistance: number;
  fadeOutDuration: number;
  isFadingAvailable: boolean;
  interactionHoldTime: number;
  teleportToComponentId: string;
  yInteractionAdjustment: number;
}

/**
 * Main class to handle teleportation behavior in the script.
 */
export default class TeleportBehavior extends ScriptBehavior {
  static config = {
    title: 'Behavior - Teleport All-In-One',
    description: 'A behavior to teleport the avatar to a component',
    tip: 'Use this when you need to move the avatar between the space objects.',
  };

  @Param({
    type: 'component',
    name: 'Component target',
  })
  private componentTarget = $Param.Component('any');

  @Folder('Interaction Mode')
  @Param({
    type: 'select',
    name: 'Interaction Mode',
    options: ['Auto', 'Key'],
  })
  private interactionMode = 'Auto';
  @Param({
    type: 'string',
    name: 'Trigger key',
    visible: (params: TeleportInterfaceParams) => params.interactionMode === 'Key',
  })
  private triggerKey = 'E';
  @Param({
    step: 0.1,
    type: 'number',
    name: 'Key dialog adjustment',
    visible: (params: TeleportInterfaceParams) => params.interactionMode === 'Key',
  })
  private yInteractionAdjustment = 0;
  @Param({
    max: 50,
    min: 0.1,
    step: 0.1,
    type: 'number',
    defaultValue: 2,
    name: 'Trigger distance (s)',
    visible: (params: TeleportInterfaceParams) => params.interactionMode === 'Key',
  })
  private triggerDistance = 2;

  @Folder('Animations')
  @Param({ type: 'boolean', defaultValue: false, name: 'Enable fadeIn - fadeOut' })
  private isFadingAvailable = false;
  @Param({
    max: 10,
    min: 0.1,
    type: 'number',
    defaultValue: 1,
    name: 'FadeIn duration',
    visible: (params: TeleportInterfaceParams) => params.isFadingAvailable === true,
  })
  private fadeInDuration = 0;
  @Param({
    max: 10,
    min: 0.1,
    type: 'number',
    defaultValue: 1,
    name: 'FadeOut duration',
    visible: (params: TeleportInterfaceParams) => params.isFadingAvailable === true,
  })
  private fadeOutDuration = 0;
  @Param({
    min: 0,
    step: 0.1,
    type: 'number',
    defaultValue: 1,
    name: 'Teleport delay (seconds)',
    visible: (params: TeleportInterfaceParams) => params.isFadingAvailable === true,
  })
  private interactionHoldTime = 0;

  /**
   * Called when the script is ready.
   */
  onReady = async () => {
    switch (this.interactionMode) {
      case 'Key':
        await this.createInteractionByKey();
        break;
      case 'Auto':
        await this.createInteractionAuto();
        break;
      default:
        return;
    }
  };

  /**
   * Creates an interaction that is triggered by a key press.
   */
  private async createInteractionByKey() {
    const interaction = await Components.create({
      type: 'interaction',
      distance: this.triggerDistance,
      distanceTarget: Player.avatar.position,
      key: `Key${this.triggerKey.toUpperCase()}`,
      atlas: `keyboard_${this.triggerKey.toLowerCase()}_outline`,
    });

    this.updateInteractionPosition(interaction);

    interaction.active = true;

    interaction.onInteraction(this.teleportAction.bind(this));
  }

  /**
   * Creates an automatic interaction based on proximity.
   */
  private async createInteractionAuto() {
    this.host.onSensorEnter(async () => {
      await this.teleportAction();
    });
  }

  /**
   * Updates the position of the interaction.
   * @param {Object} interaction - The interaction to update.
   */
  private updateInteractionPosition(interaction: Component3D) {
    interaction.position.copy(this.host.position);
    interaction.position.y =
      this.host.position.y + this.host.getDimensions().y + this.yInteractionAdjustment;
  }

  /**
   * Executes the teleportation action.
   */
  private async teleportAction() {
    try {
      this.isFadingAvailable ? this.applyFadeOut() : null;

      setTimeout(() => {
        this.teleportAvatar();
        this.isFadingAvailable ? this.applyFadeIn() : null;
      }, this.interactionHoldTime * 1000);
    } catch (error) {
      console.error(
        `Teleportation failed to ${this.componentTarget.name || 'unknown target'}:`,
        error,
      );
    }
  }

  private teleportAvatar() {
    const targetPosition = this.componentTarget.position;
    const dimension = this.componentTarget.getDimensions();

    const targetVector = new Vector3(
      targetPosition.x,
      targetPosition.y + dimension.y / 2,
      targetPosition.z,
    );

    Player.avatar.rigidBody.teleport(targetVector, this.componentTarget.quaternion);
    console.log('Teleportation successful.');
  }

  private applyFadeOut() {
    gsap.to(Player.avatar, {
      duration: this.fadeOutDuration,
      opacity: 0,
    });
  }

  private applyFadeIn() {
    gsap.to(Player.avatar, {
      opacity: 1,
      duration: this.fadeInDuration,
    });
  }
}
