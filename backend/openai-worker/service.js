/* eslint-disable no-undef */
import roles from './roles.js';

export default class OpenAIService {
  static DEFAULT_TEMPERATURE = 0.3;
  static DEFAULT_OPENAI_MODEL = 'gpt-4o';
  static DEFAULT_TIMEOUT_INTERVAL = 5000;

  constructor({ apiKey }) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://api.openai.com/v1';
  }

  handleError(methodName, error) {
    console.error(`${methodName} - Error:`, error);
    throw error instanceof Error ? error : new Error(JSON.stringify(error));
  }

  async fetchAndProcessResponse({ url, options, isStreamResponse }) {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`OpenAI API request failed with status ${response.status}`);
    }

    return isStreamResponse
      ? this.processStreamResponse(response)
      : this.processJsonResponse(response);
  }

  async processStreamResponse(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let message = '';
    let partialData = '';
    let threadId = null;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      partialData += decoder.decode(value, { stream: true });
      const lines = partialData.split('\n');
      partialData = lines.pop();

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine === 'data: [DONE]') {
          console.log('Stream completed');
          return { threadId, message };
        } else if (trimmedLine.startsWith('data: ')) {
          const event = JSON.parse(trimmedLine.substring(6));
          console.log(event);
          if (event.object === 'thread.run') {
            threadId = event.thread_id;
          } else if (event.object === 'thread.message.delta' && event.delta?.content) {
            message += this.extractMessageFromChunk(event.delta?.content);
          } else if (event.object === 'chat.completion.chunk' && event.choices[0]?.delta?.content) {
            message += event.choices[0]?.delta?.content;
          }
        }
      }
    }

    return { threadId, message };
  }

  extractMessageFromChunk(content) {
    return content.map(part => part.text?.value || '').join('');
  }

  async processJsonResponse(response) {
    const { id, thread_id } = await response.json();
    await this.pollRunUntilComplete(id, thread_id);
    return this.getLatestMessageFromThread(thread_id);
  }

  async handleTextConversation({ messageList, params }) {
    const {
      isStreamResponse = true,
      model = OpenAIService.DEFAULT_OPENAI_MODEL,
      temperature = OpenAIService.DEFAULT_TEMPERATURE,
    } = params;
    const { message } = await this.executeApiCall({
      isStreamResponse,
      methodName: 'handleTextConversation',
      url: `${this.apiUrl}/chat/completions`,
      body: { model, temperature, messages: messageList, stream: isStreamResponse },
    });
    return { message };
  }

  async createAndRunThread({
    messageList,
    assistantId,
    temperature = OpenAIService.DEFAULT_TEMPERATURE,
  }) {
    console.log('Creating and running a new thread with Assistant...');
    return this.executeApiCall({
      isStreamResponse: true,
      methodName: 'createAndRunThread',
      url: `${this.apiUrl}/threads/runs`,
      body: { temperature, messages: messageList, assistant_id: assistantId, stream: true },
      additionalHeaders: { 'OpenAI-Beta': 'assistants=v2' },
    });
  }

  async getLatestMessageFromThread(threadId) {
    const url = `${this.apiUrl}/threads/${threadId}/messages`;
    return this.executeApiCall({
      methodName: 'getLatestMessageFromThread',
      url,
      method: 'GET',
      additionalHeaders: { 'OpenAI-Beta': 'assistants=v2' },
    });
  }

  async pollRunUntilComplete(runId, threadId) {
    const pollInterval = OpenAIService.DEFAULT_TIMEOUT_INTERVAL;
    let runStatus = 'queued';

    const url = `${this.apiUrl}/threads/${threadId}/runs/${runId}`;

    while (runStatus !== 'completed') {
      await this.delay(pollInterval);
      const response = await this.executeApiCall({
        methodName: 'pollRunUntilComplete',
        url,
        method: 'GET',
        additionalHeaders: { 'OpenAI-Beta': 'assistants=v2' },
      });

      runStatus = response.status;
      if (runStatus === 'completed') {
        console.log('Run completed');
      }
    }
  }

  async continueConversationInThread({
    message,
    threadId,
    assistantId,
    temperature = OpenAIService.DEFAULT_TEMPERATURE,
  }) {
    console.log(`Continuing conversation in thread with ID: ${threadId}`);
    return this.executeApiCall({
      isStreamResponse: true,
      methodName: 'continueConversationInThread',
      url: `${this.apiUrl}/threads/${threadId}/runs`,
      body: {
        assistant_id: assistantId,
        additional_messages: [{ role: roles.user, content: message }],
        temperature,
        stream: true,
      },
      additionalHeaders: { 'OpenAI-Beta': 'assistants=v2' },
    });
  }

  createHeaders(additionalHeaders = {}) {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      ...additionalHeaders,
    };
  }

  async executeApiCall({
    methodName,
    url,
    body = {},
    isStreamResponse = false,
    additionalHeaders = {},
    method = 'POST',
  }) {
    try {
      console.log(`${methodName} - Sending request`);
      const options = {
        method,
        headers: this.createHeaders(additionalHeaders),
        body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
      };

      return await this.fetchAndProcessResponse({ url, options, isStreamResponse });
    } catch (error) {
      this.handleError(methodName, error);
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
