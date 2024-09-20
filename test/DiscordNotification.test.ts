import fetchMock from 'fetch-mock';

import sendDiscordNotification, {
  DiscordNotificationParams,
} from '../src/common/components/DiscordNotification';
import isValidUrl from '../src/common/utils/isValidUrl';

describe('sendDiscordNotification', () => {
  const SERVER_URL = 'https://jolly-poetry-c57a.sy54bjwfmg.workers.dev/api/notifications/discord';

  beforeAll(() => {
    fetchMock.config.fallbackToNetwork = false;
  });

  afterAll(() => fetchMock.restore());

  afterEach(() => fetchMock.reset());

  it('should send a notification successfully', async () => {
    const params: DiscordNotificationParams = {
      message: 'Test message',
      webhookUrl: 'https://discord.com/api/webhooks/test',
    };

    expect(isValidUrl(params.webhookUrl)).toBe(true);

    fetchMock.post(SERVER_URL, {
      status: 201,
    });

    await sendDiscordNotification(params);

    expect(fetchMock.called(SERVER_URL)).toBe(true);

    const lastCall = fetchMock.lastCall(SERVER_URL);
    expect(lastCall).toBeTruthy();
    expect(lastCall![1]!.method).toBe('POST');
    expect(fetchMock.lastOptions(SERVER_URL)!.body).toEqual(
      JSON.stringify({ webhookUrl: params.webhookUrl, message: params.message })
    );
  });

  it('should log an error if webhook URL is invalid', async () => {
    const params: DiscordNotificationParams = {
      webhookUrl: 'invalid-url',
      message: 'Test message',
    };

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    await sendDiscordNotification(params);

    expect(consoleErrorSpy).toHaveBeenCalledWith('No valid webhook URL provided!');

    expect(fetchMock.called()).toBe(false);

    consoleErrorSpy.mockRestore();
  });

  it('should handle network errors gracefully', async () => {
    const params: DiscordNotificationParams = {
      webhookUrl: 'https://discord.com/api/webhooks/test',
      message: 'Test message',
    };

    fetchMock.post(SERVER_URL, { throws: new Error('Network failure') });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    await sendDiscordNotification(params);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to send Discord notification:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});