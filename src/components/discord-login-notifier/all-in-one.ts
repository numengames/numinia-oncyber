import { Param, Player, ScriptComponent } from '@oo/scripting';

const SERVER_URL = 'https://jolly-poetry-c57a.sy54bjwfmg.workers.dev/api/notifications/discord';

/**
 * Main class to handle redirect behavior in the script.
 */
export default class DiscordLoginNotifierComponent extends ScriptComponent {
  static config = {
    title: 'Component - Discord Notifier',
    description:
      'The DiscordNotifier component sends real-time messages to a Discord channel using a webhook, perfect for keeping your community informed during gameplay.',
    tip: 'Use it to announce key in-game events, player achievements, or important updates directly to your Discord server.',
  };

  @Param({
    type: 'string',
    name: 'Webhook URL',
  })
  private webhookUrl = '';
  @Param({ type: 'string', name: 'Default message' })
  message = '';
  @Param({
    type: 'string',
    name: 'The name of the space',
  })
  private spaceName = false;
  @Param({
    type: 'boolean',
    defaultValue: false,
    name: 'Does the message contains the walletId of the user?',
  })
  private messageContainsWalletId = false;

  /**
   * Called when the script starts.
   */
  async onStart() {
    const message = `${this.spaceName || ''} ${this.message} ${this.messageContainsWalletId ? Player.userId : null}`;

    await this.sendDiscordNotification(message);
  }

  private async sendDiscordNotification(message: string): Promise<void | Response> {
    if (!this.webhookUrl || !this.isValidUrl(this.webhookUrl)) {
      console.error('No webhook URL provided!');
      return;
    }

    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        ...{ body: JSON.stringify({ webhookUrl: this.webhookUrl, message }) },
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error('Network error:', error);
      throw error;
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
}
