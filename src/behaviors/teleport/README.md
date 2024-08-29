# Teleport Behavioral Component

## What is the Teleport Component?

The **Teleport** component is a specialized feature developed for the **Oncyber** platform. It is designed to enable users or entities within a virtual environment to instantly move from one location to another, thereby enhancing navigation and usability within the environment.

## Purpose

The primary purpose of the **Teleport** component is to facilitate quick navigation across different areas of a virtual environment. This eliminates the need to manually traverse large distances, which is especially useful in extensive virtual spaces where rapid movement is essential for improving user experience.

## Implementation Methods

There are two main methods to implement the Teleport functionality in your project:

### 1. Using the **all-in-one** Script

The **all-in-one** script includes everything necessary to quickly integrate the Teleport functionality into your project. This method is ideal for projects that are not expected to scale significantly or those that are relatively small in scope.

### 2. Manual Integration

For larger projects or components that are expected to be reused multiple times, you can manually integrate the Teleport functionality by copying the necessary scripts from both the `behaviors/teleport/TeleportBehavior.ts` directory and the `common` directory. This method helps avoid repeating the same code structures across your project, making it more maintainable and scalable.

## Configuration Parameters

To properly set up the Teleport component, certain parameters need to be configured. These parameters ensure that the component works correctly within your virtual environment. Below is a detailed explanation of each parameter:

### 1. **Component Target** (Required)

This is the target component to which the player will be teleported when they interact with the component associated with the Teleport behavioral component.

- **How to configure**: Select the object or area within your virtual environment that you want the player to be teleported to.

### 2. **Interaction Mode** (Required)

This setting determines how the player will interact with the Teleport component. There are two options:

- **Key**: The player will need to press a specific key to trigger the teleport.
- **Auto**: The teleport will trigger automatically when the player comes into proximity with the component.

**Important Note**: If you select "Auto" mode, ensure that the collision and sensor functionalities are activated on the component to detect the player’s presence and trigger the teleport.

### 3. **Trigger Key** (Depends on Interaction Mode)

This parameter is only required if you have selected "Key" as your Interaction Mode. It specifies which key the player needs to press to interact with the Teleport component.

- **How to configure**: Choose the key from a predefined list that the player will use to trigger the teleport.

### 4. **Key Dialog Adjustment** (Depends on Interaction Mode)

This setting is also dependent on selecting "Key" as your Interaction Mode. It defines the distance within which the player can activate the Teleport component.

- **How to configure**: Adjust the distance parameter to control how close the player needs to be to the component before they can interact with it using the specified key.

## Directory Structure

Below is a representation of the relevant directory structure for the Teleport component and its dependencies:

```plaintext
├── behaviors
│   └── teleport
│       └── TeleportBehavior.ts          # Handles the behavior
└── common
    ├── components
    │   └── TeleportAction.ts            # Handles the teleport
    ├── effects
    │   ├── FadeIn.ts                    # Fade in effect optionally used by the teleport if defined
    │   └── FadeOut.ts                   # Fade out effect optionally used by the teleport if defined
    └── utils
        └── InteractionDirector.ts       # Utility for managing interactions (By Key or Auto)
```

This directory structure highlights the main Teleport behavior script and its dependencies located in the common directory, which are essential for implementing the Teleport functionality in a scalable way.
