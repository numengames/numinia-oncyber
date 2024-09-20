/* eslint-disable no-undef */
export default class NotificationController {
  constructor({ notificationService }) {
    this.notificationService = notificationService;
  }

  async sendDiscordNotification({ request }) {
    try {
      const { webhookUrl, message } = await request.json();

      await this.notificationService.sendDiscordNotification(webhookUrl, message);

      return new Response(null, { status: 204 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
}
