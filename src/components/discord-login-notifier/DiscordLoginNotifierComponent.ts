import { Param, ScriptComponent, World, Player } from '@oo/scripting';

import sendDiscordNotification, { DiscordNotificationParams } from '../../common/components/DiscordNotification.ts';

/**
 * Main class to handle discord notifier component in the script.
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
    type: 'boolean',
    defaultValue: false,
    name: 'Does the message contains the name of the space?',
  })
  private messageHasSpaceName = false;
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
    try {
      const messageParts = [
        this.messageHasSpaceName ? World.name : '',
        this.message,
        this.messageContainsWalletId ? Player.userId : '',
      ];
      const message = messageParts.filter(part => part).join(' ');

      const params: DiscordNotificationParams = {
        webhookUrl: this.webhookUrl,
        message,
      };

      await sendDiscordNotification(params);
    } catch (error) {
      console.error('Failed to send Discord notification:', error);
    }
  }
}
