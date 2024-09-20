# Discord Notifier Component

## What is the Discord Notifier Component?

The **Discord Notifier** component is a specialized feature developed for the **Oncyber** platform. It allows the integration of Discord notifications directly within your virtual environment, enabling real-time communication of key events to a designated Discord channel.

## Purpose

The primary purpose is to send customized notifications to a Discord server using a webhook. This feature is particularly useful for announcing in-game events, player achievements, or important updates to keep your community engaged and informed during gameplay.

## Implementation Methods

There are two main methods to implement the **Discord Notifier** functionality in your project:

### 1. Using the **all-in-one** Script

The **All-in-One** script encapsulates all necessary functionalities within a single file. This method is ideal for quick integrations and smaller projects where simplicity and rapid setup are prioritized.

### 2. Manual (Modular) Integration

For larger projects or those requiring greater maintainability and scalability, the **Modular** approach is recommended. This method involves integrating multiple files, promoting code reusability and better organization.

- **Components**: `DiscordLoginNotifierComponent.ts`
- **Common Utilities**: Located in the `common` directory, including `DiscordNotification.ts`, `network.ts`, and `isValidUrl.ts`

## Configuration Parameters

To properly set up the **Discord Notifier** component, certain parameters need to be configured. These parameters ensure that the component works correctly within your virtual environment. The following parameters apply to both implementation methods:

### 1. **Webhook URL** (Required)

This is the URL of the Discord webhook that will receive the notifications. It needs to be configured for the component to send messages.

- **Description**: The URL of the Discord webhook that will receive the notifications.
- **How to configure**: Copy your Discord webhook URL into this field.

### 2. **Default Message** (Optional)

- **Description**: The message that will be sent to the Discord channel.
- **How to configure**: Enter the text message you want to send.

### 3. **Space Name** (Optional)

- **Description**: The name of the virtual space or environment where the event occurs.
- **How to configure**: Provide a name for your space or leave it blank if not needed.

### 4. **Does message contains walletId** (Optional)

- **Description**: When enabled, the message sent to Discord will include the wallet ID of the user triggering the notification.
- **How to configure**: Set to true to include the wallet ID in the message; otherwise, set to false.

## Directory Structure

Below is a representation of the relevant directory structure for the Discord Notifier component and its dependencies:

```plaintext
├── components
│   └── discord-login-notifier
│       └── DiscordLoginNotifierComponent.ts     # Handles the component
└── common
    ├── components
    │   └── DiscordNotification.ts               # Handles the Discord notifications
    ├── network
    │   └── network.ts                           # Utility for handling network requests
    └── utils
        └── isValidUrl.ts                        # Validate that the webhook url is valid
```

This directory structure highlights the main Discord Notifier behavior script and its dependencies located in the common directory, which are essential for implementing the Discord Notifier functionality in a scalable way.

## 6. Backend Setup (Required)

Since third-party requests (like sending notifications to Discord) are restricted, this component relies on a backend worker. Follow these steps to set up the backend:

1. **Create a Cloudflare Account**:

   - If you don't have one, sign up at [Cloudflare](https://cloudflare.com).

2. **Navigate to Workers**:

   - In the Cloudflare Dashboard, go to the "Workers" section.

3. **Deploy the Backend Worker**:

   - Clone the repository from [GitHub](https://github.com/numengames/numinia-oncyber/tree/main/backend/worker).
   - Deploy the code to a new Cloudflare Worker following Cloudflare's deployment guidelines.

4. **Configure Environment Variables**:

   - Set the required environment variables in Cloudflare for your webhook URL and other configurations.
   - Example:
     - `DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...`
     - Ensure sensitive information is stored securely and not exposed in the frontend.

5. **Update Frontend Component**:

   - Modify your frontend component to use the deployed backend endpoint (`POST /api/notifications/discord`) for sending Discord notifications.

6. **Test the Integration**:
   - Verify that notifications are successfully sent to your Discord channel by triggering events in your virtual environment.

## Changelog

- **September 20, 2024 - v1.0.0**: Initial release of the component with Discord notifier functionality.
