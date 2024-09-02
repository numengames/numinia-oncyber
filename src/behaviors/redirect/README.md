# Redirect Behavioral Component

## What is the Redirect Behavioral Component?

The **Redirect** behavioral component is a specialized feature developed for the **Oncyber** platform. It allows users or entities within a virtual environment to be seamlessly redirected to another URL or space, either in the same window or in a new tab. This enhances the ability to navigate across different virtual environments or web pages directly from within the platform.

## Purpose

The primary purpose of the **Redirect** component is to facilitate smooth transitions between different virtual spaces or web pages. This can be particularly useful in scenarios where you want to guide users to related content, external resources, or different sections of a virtual environment without requiring manual navigation.

## Implementation Methods

There are two main methods to implement the Redirect functionality in your project:

### 1. Using the **all-in-one** Script

The **all-in-one** script includes everything necessary to quickly integrate the Redirect functionality into your project. This method is ideal for projects that require a simple and quick setup, especially in smaller environments.

### 2. Manual Integration

For larger projects or components that are expected to be reused multiple times, you can manually integrate the Redirect functionality by copying the necessary scripts from both the `behaviors/redirect/RedirectBehavior.ts` directory and the `common` directory. This approach promotes better code reusability and maintainability.

## Configuration Parameters

To properly set up the Redirect component, certain parameters need to be configured. These parameters ensure that the component works correctly within your virtual environment. Below is a detailed explanation of each parameter:

### 1. **Web URL** (Required)

This is the URL or the virtual space to which the user will be redirected.

- **How to configure**: Input the desired URL or the address of the space within your virtual environment.

### 2. **Redirect Mode** (Required)

This setting determines how the redirection will occur. There are two options:

- **Existing**: The redirection will occur in the same tab or window.
- **New tab**: The redirection will open in a new tab or window.

**Important Note**: Consider the user experience when choosing between the existing tab or a new tab, as it can impact the flow of navigation.

### 3. **Interaction Mode** (Required)

This setting determines how the player will interact with the Redirect component. There are two options:

- **Key**: The player will need to press a specific key to trigger the redirect.
- **Auto**: The redirect will trigger automatically when the player comes into proximity with the component.

**Important Note**: If you select "Auto" mode, ensure that the collision and sensor functionalities are activated on the component to detect the player’s presence and trigger the redirect.

### 4. **Trigger Key** (Depends on Interaction Mode)

This parameter is only required if you have selected "Key" as your Interaction Mode. It specifies which key the player needs to press to interact with the Redirect component.

- **How to configure**: Choose the key from a predefined list that the player will use to trigger the redirect.

### 5. **Trigger Distance** (Depends on Interaction Mode)

This setting is also dependent on selecting "Key" as your Interaction Mode. It defines the distance within which the player can activate the Redirect component.

- **How to configure**: Adjust the distance parameter to control how close the player needs to be to the component before they can interact with it using the specified key.

### 6. FadeOut Duration (Optional)

If you want to apply a fade-out effect before the redirection occurs, this parameter allows you to set the duration of the effect.

- **How to configure**: Set the duration for the fade-out effect in seconds.

### 7. Interaction Hold Time (Optional)

This setting defines the delay (in seconds) before the redirection occurs after the interaction is triggered.

- **How to configure**: Specify the delay time in seconds to control how long after the interaction the redirection will be executed.

## Directory Structure

Below is a representation of the relevant directory structure for the Redirect component and its dependencies:

```plaintext
├── behaviors
│   └── redirect
│       └── RedirectBehavior.ts          # Handles the behavior
└── common
    ├── components
    │   └── RedirectAction.ts            # Handles the redirect
    ├── effects
    │   └── FadeOut.ts                   # Fade out effect optionally used by the redirect if defined
    └── interactions
        └── InteractionDirector.ts       # Utility for managing interactions (By Key or Auto)
    └── utils
        └── isValidUrl.ts       # Checks that the URL is valid
```

This directory structure highlights the main Redirect behavior script and its dependencies located in the common directory, which are essential for implementing the Redirect functionality in a scalable way.
