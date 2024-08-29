/* eslint-disable no-undef */
import roles from './roles.js';

export default class OpenAIController {
  constructor({ openAIService }) {
    this.openAIService = openAIService;
  }

  manageTextResponse(response) {
    return response.message !== undefined
      ? this.createJsonResponse(response, 200)
      : new Response('', { status: 204 });
  }

  createJsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  handleErrorResponse(error) {
    return this.createJsonResponse({ error: error.message }, 400);
  }

  createMessageList(conversationList, role = null, message = null) {
    const messageList = conversationList.map(msg => ({
      role: roles[msg.role.toLowerCase()] || msg.role.toLowerCase(),
      content: msg.content,
    }));

    if (message && role) {
      messageList.push({
        role: roles[role.toLowerCase()] || role.toLowerCase(),
        content: message,
      });
    }

    return messageList;
  }

  async textConversationHandler(inputParams) {
    const messageList = this.createMessageList(
      inputParams.conversationList,
      inputParams.role,
      inputParams.message,
    );

    const response = await this.openAIService.handleTextConversation({
      messageList,
      params: inputParams,
    });

    return this.manageTextResponse(response);
  }

  async assistantTextConversationHandler({ message, assistantId, threadId, temperature }) {
    const assistantResponse = await this.openAIService.continueConversationInThread({
      message,
      threadId,
      assistantId,
      temperature,
    });

    return this.manageTextResponse(assistantResponse);
  }

  async handleConversation({ request, params, handler }) {
    try {
      const inputParams = await request.json();
      console.log({ ...inputParams, ...params });
      const response = await handler.call(this, { ...inputParams, ...params });
      return response;
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  async handleTextConversation({ request, params }) {
    return this.handleConversation({ request, params, handler: this.textConversationHandler });
  }

  async handleCreateAndRunThread({ request }) {
    try {
      const { assistantId, messages, temperature } = await request.json();

      const response = await this.openAIService.createAndRunThread({
        messages,
        assistantId,
        temperature,
      });

      return this.createJsonResponse(response, 201);
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  async handleAssistantTextConversation({ request, params }) {
    return this.handleConversation({
      request,
      params,
      handler: this.assistantTextConversationHandler,
    });
  }
}
