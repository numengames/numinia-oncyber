# OpenAI Worker

This project is a Cloudflare Worker that interacts with the OpenAI API to manage conversations and assistant threads. The Worker is organized into a modular structure, with a router handling routes, a controller managing business logic, and a service making API calls to OpenAI.

## Project Structure

The project structure is as follows:

openai-worker/
├── openai.controller.js   # Controller for handling interactions with the OpenAI API
├── openai.service.js      # Service responsible for making API calls to OpenAI
├── package-lock.json      # Lockfile for npm
├── package.json           # Project dependencies and configuration
├── proxy.js               # (Optional) Code related to proxying, if applicable
├── redirect.js            # (Optional) Code related to redirections, if applicable
├── roles.js               # Definitions of roles used in conversations
├── router.js              # Router that defines routes and handles HTTP requests
├── worker.js              # Entry point of the Worker
└── wrangler.toml          # Wrangler configuration for deploying the Worker

## Prerequisites

- **Node.js** installed on your machine.
- **Wrangler** installed globally:

```bash
  npm install -g wrangler
```

## Installation Steps

1. Clone this repository:

```bash
git clone https://github.com/your-username/my-cloudflare-worker.git
cd my-cloudflare-worker
```

2. Install dependencies:

```bash
npm install
```

3. Configure the necessary variables in the wrangler.toml file:

```
name = "your-worker-name"
account_id = "your_account_id"
```

4. Replace OPENAI_API_KEY in router.js with your own OpenAI API key.

## Deployment

To deploy the Worker to Cloudflare, run:

```bash
wrangler publish
```

## Usage

The Worker provides several routes that you can use:

-	POST /api/conversation/text: Handles a text conversation.
-	POST /api/thread/assistant/text: Creates and runs a conversation thread.
-	POST /api/thread/:threadId/assistant/text: Continues a conversation in an existing thread.
-	GET /api/monit: Returns “OK” for monitoring purposes.

Any other route will return a 404 response.

## Customization

You can adjust the Worker’s behavior by modifying the controllers (openai.controller.js) and services (openai.service.js). Be sure to review the definitions in roles.js if you need to support different types of roles in conversations.

## License

## Contributions

If you would like to contribute to this project, please follow these steps:

1. Fork the project.
2. Create a branch for your changes: git checkout -b my-new-branch.
3. Commit your changes: git commit -m 'Add new feature'.
4. Push to the branch: git push origin my-new-branch.
5. Create a Pull Request.

## Example Implementation

In this example, we’ve created a router (router.js) that handles routes for interacting with the OpenAI API. Each route is associated with a controller that processes the requests and responses. The service (openai.service.js) abstracts the direct API calls to OpenAI, providing reusable methods.

### Router.js

router.js defines the routes and how different HTTP requests are handled.

### OpenAIController

openai.controller.js manages the business logic, including how responses are formatted and errors are handled.

### OpenAIService

openai.service.js performs API calls to OpenAI, handling both JSON responses and streaming responses.

This setup is highly flexible, allowing you to extend the Worker’s functionality by adding new routes, controllers, or services as needed.

If you need more details or specific assistance, feel free to reach out.
