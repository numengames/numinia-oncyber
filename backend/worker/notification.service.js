/* eslint-disable no-undef */
export default class NotificationService {
  handleError(methodName, error) {
    console.error(`${methodName} - Error:`, error);
    throw error instanceof Error ? error : new Error(JSON.stringify(error));
  }

  async fetchAndProcessResponse({ url, options }) {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`${url} request failed with status ${response.status}`);
    }

    const contentType = response.headers.get('Content-Type') || '';

    if (contentType.includes('application/json')) {
      return response.json();
    } else if (response.status === 204 || response.status === 205) {
      return null;
    } else {
      return response.text();
    }
  }

  async sendDiscordNotification(webhookUrl, message) {
    if (!webhookUrl) {
      console.error('No webhook URL provided!');
      throw new Error('webhookUrl was not provided');
    }

    try {
      await this.executeApiCall({
        url: webhookUrl,
        body: { content: message },
      });
      console.log('Message sent to Discord');
    } catch (error) {
      console.error('Error sending message to Discord', error);
    }
  }

  createHeaders(additionalHeaders = {}) {
    return {
      'Content-Type': 'application/json',
      ...additionalHeaders,
    };
  }

  async executeApiCall({ url, body = {}, additionalHeaders = {}, method = 'POST' }) {
    try {
      console.log(`Sending request to ${method} ${url}`);

      const options = {
        method,
        headers: this.createHeaders(additionalHeaders),
        body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
      };

      return await this.fetchAndProcessResponse({ url, options });
    } catch (error) {
      this.handleError(url, error);
    }
  }
}
