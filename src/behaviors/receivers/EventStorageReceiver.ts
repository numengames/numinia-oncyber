import { ScriptBehavior, Receiver, Param, World } from '@oo/scripting'

import { getEventQueue, clearEventQueue } from '../../common/state/appState';

export default class EventStorageReceiver extends ScriptBehavior {
  private processing = false;

  @Param({
    type: 'string',
    name: 'Server URL',
  })
  private serverUrl = '';

  @Receiver()
  async processQueue(): Promise<void> {
    if (this.processing) {
      console.log('Already processing queue.');
      return;
    }

    this.processing = true;

    const eventQueue = getEventQueue();

    if (eventQueue.length === 0) {
      console.log('No events to process.');
      this.processing = false;
      return;
    }

    try {
      for (const event of eventQueue) {
        await this.postRequest({
          url: this.serverUrl,
          options: {
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // webhookUrl: event.webhookUrl,
              worldName: World.name,
              message: event.message,
              objectId: event.objectId,
              eventType: event.eventType,
            }),
          },
        });
        console.log(`Notification sent for ${event.eventType} event.`);
      }
    } catch (error) {
      console.error('Failed to send notification:', error);
    } finally {
      clearEventQueue();
      this.processing = false;
    }
  }

  private async postRequest({ url, options = {} }: { url: string; options?: RequestInit }): Promise<Response> {
    try {
      const response = await fetch(url, {
        ...options,
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response;
    } catch (error) {
      console.error(`Network error:`, error);
      throw error;
    }
  }
}