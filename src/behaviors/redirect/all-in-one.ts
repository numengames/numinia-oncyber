import gsap from 'gsap';
import { Param, Folder, Player, Components, Component3D, ScriptBehavior } from '@oo/scripting';

interface RedirectBehaviorParams {
  triggerKey: string;
  redirectToUrl: string;
  redirectAction: string;
  interactionMode: string;
  triggerDistance: number;
  fadeOutDuration: number;
  isFadingAvailable: boolean;
  interactionHoldTime: number;
  yInteractionAdjustment: number;
}

/**
 * Main class to handle redirect behavior in the script.
 */
export default class RedirectBehavior extends ScriptBehavior {
  static config = {
    title: 'Behavior - Redirect All-In-One',
    description: 'A behavior to redirect to another space or URL',
    tip: 'Use this if you wanna change or open the navigator with a new URL',
  };

  @Param({ type: 'string', name: 'Web URL' })
  private redirectToUrl = '';

  @Param({
    type: 'select',
    options: ['New tab', 'Existing'],
    name: 'Redirect or open in new tab',
  })
  private redirectMode = 'Existing';

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
    visible: (params: RedirectBehaviorParams) => params.interactionMode === 'Key',
  })
  private triggerKey = 'E';
  @Param({
    step: 0.1,
    type: 'number',
    name: 'Key dialog adjustment',
    visible: (params: RedirectBehaviorParams) => params.interactionMode === 'Key',
  })
  private yInteractionAdjustment = 0;
  @Param({
    min: 0.1,
    step: 0.1,
    type: 'number',
    defaultValue: 2,
    name: 'Trigger distance',
    visible: (params: RedirectBehaviorParams) => params.interactionMode === 'Key',
  })
  private triggerDistance = 2;

  @Folder('Animations')
  @Param({ type: 'boolean', defaultValue: false, name: 'Enable fadeIn - fadeOut' })
  private isFadingAvailable = false;
  @Param({
    min: 0.1,
    step: 0.1,
    type: 'number',
    name: 'FadeOut duration',
    visible: (params: RedirectBehaviorParams) => params.isFadingAvailable === true,
  })
  private fadeOutDuration = 0;
  @Param({
    min: 0,
    step: 0.1,
    type: 'number',
    defaultValue: 1,
    name: 'Teleport delay (seconds)',
    visible: (params: RedirectBehaviorParams) => params.isFadingAvailable === true,
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

    interaction.onInteraction(this.redirectAction.bind(this));
  }

  /**
   * Creates an automatic interaction based on proximity.
   */
  private async createInteractionAuto() {
    this.host.onSensorEnter(async () => {
      await this.redirectAction();
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
  private async redirectAction() {
    try {
      if (!this.isValidUrl(this.redirectToUrl)) {
        console.error('Invalid URL provided:', this.redirectToUrl);
        return;
      }

      if (this.isFadingAvailable && this.fadeOutDuration) {
        this.applyFadeOut();
      }

      const delay = this.interactionHoldTime * 1000;

      setTimeout(() => {
        this.performRedirection(this.redirectMode, this.redirectToUrl);
      }, delay);
    } catch (error) {
      console.error('Redirection failed -', (error as Error).message);
    }
  }

  private goToAnotherSpace(url: string, mode: string): void {
    const newWindow = window.open(url, mode);

    if (newWindow) {
      newWindow.focus();
    } else {
      console.error('Failed to open new window or tab.');
    }
  }

  private performRedirection(redirectMode: string, redirectToUrl: string) {
    if (redirectMode === 'Existing') {
      window.location.href = redirectToUrl;
    } else {
      this.goToAnotherSpace(redirectToUrl, redirectMode);
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  private applyFadeOut() {
    gsap.to(Player.avatar, {
      duration: this.fadeOutDuration,
      opacity: 0,
    });
  }
}
