# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

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
