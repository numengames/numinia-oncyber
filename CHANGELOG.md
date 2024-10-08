# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.4.0] - 2024-10-08

### Added
- **EventStorageReceiver**: Added `EventStorageReceiver` to store events for future processing.
- **InsertPasswordEmitter**: Improved `InsertPasswordEmitter` to notify the `InteractionDirector` if the password was successfully resolved.
- **InsertPasswordPrompt**: Enhanced the UX and flow of the password prompt.

### Fixed
- **RotateReceiver, TeleportReceiver, TranslateReceiver**: Fixed issues in the behavior of rotate, teleport, and translate receivers.
- **Fade utilities**: Resolved bugs in the fade utilities (`fadeIn` and `fadeOut`).

### Changed
- **appState**: Minor updates in the global state management with `appState`.
- **InteractionDirector**: Improved component state handling and event emission logic.
- **Eslint and Prettier**: Updated eslint and prettier configurations.

## [1.3.0] - 2024-09-20

### Added

- **feat:** Introduced the `Discord Notifier Component` that allows integration of Discord notifications within virtual environments.
- **docs:** Added documentation for the `Discord Notifier Component` in `README.md`, explaining its purpose, implementation methods, and configuration.

### Changed

- **chore:** Updated directory structure to accommodate the new `Discord Notifier` component and its dependencies.
- **chore:** Added backend setup instructions for deploying the Cloudflare Worker responsible for sending Discord notifications.

### Fixed

- **fix:** Resolved some minor path issues related to the new component dependencies.

## [1.2.1] - 2024-09-02

### Fixed

- **fix:** Corrected an issue with the `Teleport` component where the `fadeIn/fadeOut` effects were not applied correctly to the appropriate elements.
- **fix:** Corrected paths and dependencies, including the integration of `gsap`, ensuring proper functionality across the project.
- **fix:** Adjusted the default duration for visual effects from 1 second to 0 seconds for instantaneous transitions.

### Changed

- **chore:** Unified interfaces to simplify and streamline the codebase.
- **chore:** Updated paths to resolve project build issues.

### Added

- **docs:** Improved documentation, including updates to the `README.md`.

## [1.2.0] - 2024-09-02

### Added

- **feat:** Introduced the `Redirect Behavioral Component` allowing users to redirect to other URLs or spaces within the virtual environment.

### Changed

- **chore:** Updated `README.md` to reflect the new `Redirect` component and other structural changes.

## [1.1.0] - 2024-09-01

### Added

- **feat:** Include `CONTRIBUTING.md` & remove the Contributing section from `README.md`.

### Changed

- **chore:** Solve an issue with the link to a specific file of the project in `README.md`.
- **chore:** Remove useless scripts.
- **chore:** Remove some useless runners & update `package.json` description.
- **chore:** Lint the code.
- **chore:** Remove wrong command in `README.md`.

### Fixed

- **fix:** Solve an issue where an async operation was missing (lack of `await` keyword).

## [1.0.0] - 2024-08-29

- **Initial commit:** Set up the initial structure of the project.
