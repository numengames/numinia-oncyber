import network from '../network/network.ts';
import isValidUrl from '../utils/isValidUrl.ts';

const SERVER_URL = 'https://jolly-poetry-c57a.sy54bjwfmg.workers.dev/api/notifications/discord';

export interface DiscordNotificationParams {
  message: string;
  webhookUrl: string;
}

export default async ({ webhookUrl, message }: DiscordNotificationParams): Promise<void> => {
  if (!webhookUrl || !isValidUrl(webhookUrl)) {
    console.error('No valid webhook URL provided!');
    return;
  }

  try {
    await network.postRequest({
      url: SERVER_URL,
      options: {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ webhookUrl, message }),
      },
    });
    console.log('Discord notification sent successfully.');
  } catch (error) {
    console.error('Failed to send Discord notification:', error);
  }
};
