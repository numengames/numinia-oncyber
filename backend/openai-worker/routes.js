/* eslint-disable no-undef */
import OpenAIService from './openai.service.js';
import OpenAIController from './openai.controller.js';

// TODO: Replace with your API Key
const OPENAI_API_KEY = 'xxxx';

const openAIService = new OpenAIService({
  apiKey: OPENAI_API_KEY,
});

const openAIController = new OpenAIController({ openAIService });

class Router {
  routes = [];

  handle(request) {
    for (const route of this.routes) {
      const match = route[0](request);
      if (match) {
        return route[1]({ ...match, request });
      }
    }
    const match = this.routes.find(([matcher]) => matcher(request));
    if (match) {
      return match[1](request);
    }
  }

  register(handler, path, method) {
    const urlPattern = new URLPattern({ pathname: path });
    this.routes.push([
      request => {
        if (method === undefined || request.method.toLowerCase() === method) {
          const match = urlPattern.exec({
            pathname: new URL(request.url).pathname,
          });
          if (match) {
            return { params: match.pathname.groups };
          }
        }
      },
      args => handler(args),
    ]);
  }

  options(path, handler) {
    this.register(handler, path, 'options');
  }
  head(path, handler) {
    this.register(handler, path, 'head');
  }
  get(path, handler) {
    this.register(handler, path, 'get');
  }
  post(path, handler) {
    this.register(handler, path, 'post');
  }
  put(path, handler) {
    this.register(handler, path, 'put');
  }
  patch(path, handler) {
    this.register(handler, path, 'patch');
  }
  delete(path, handler) {
    this.register(handler, path, 'delete');
  }

  all(path, handler) {
    this.register(handler, path);
  }
}

// Setting up our application:

const router = new Router();

router.post(
  '/api/conversation/text',
  openAIController.handleTextConversation.bind(openAIController),
);

router.post(
  '/api/thread/assistant/text',
  openAIController.handleCreateAndRunThread.bind(openAIController),
);

router.post(
  '/api/thread/:threadId/assistant/text',
  openAIController.handleAssistantTextConversation.bind(openAIController),
);

router.get('/api/monit', () => new Response('OK', { status: 200 }));

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
