# Contributing Guide

Thank you for considering contributing to this project! Below are some guidelines to help you contribute effectively.

## Getting Started

### 1. Fork the Repository

Click the `Fork` button at the top-right corner of this page to create a copy of this repository under your GitHub account.

### 2. Clone Your Fork

Clone the repository to your local machine using the following command in the terminal:

```bash
git clone https://github.com/numengames/numinia-oncyber.git
```

### 3. Create a Branch

Create a new branch to work on your contribution:

```bash
git checkout -b branch-name
```

Choose a descriptive branch name that briefly explains the changes you will make, such as feature/add-new-feature or fix/resolve-issue-x.

### 4. Make Your Changes

Make the necessary changes in your local branch. Be sure to follow the project’s style and structure conventions.

### 5. Ensure Everything Works

Before submitting your changes, ensure everything works correctly and nothing is broken. Run the project’s tests, if any:

```bash
npm run test
```

### 6. Commit and Push Your Changes

Stage and commit your changes:

```bash
git add .
git commit -m "Clear and concise description of the changes"
```

Then, push your changes to your forked repository:

```bash
git push origin branch-name
```

### 7. Create a Pull Request

Once your changes are in your fork, go to the main page of this repository (the original one) and click the New Pull Request button. Select the branch you created and describe the changes you made.

## Code Conventions

Please follow these guidelines to maintain a consistent code style across the project:

- **Indentation**: Use 2 spaces per indentation level. Avoid using tabs.
- **Semicolons**: Always use semicolons to terminate statements.
- **Quotes**: Use single quotes (`'`) for strings, except when the string contains a single quote that would require escaping.
- **Line Length**: Keep lines to a maximum of 80 characters when possible. For longer lines, consider breaking them up for readability.
- **File Naming**: Use `camelCase` for filenames, and ensure that TypeScript files have the `.ts` or `.tsx` extension as appropriate.
- **Interfaces and Types**: Define all types and interfaces using TypeScript's `interface` and `type` keywords. Ensure that these are well-documented with JSDoc comments.
- **Imports**: Group imports logically, keeping third-party imports separate from local imports. Import modules on separate lines.
- **Comments**: Use JSDoc comments (`/** ... */`) for documenting interfaces, functions, and complex code logic. Inline comments should be used sparingly and only when necessary to explain non-obvious code.
- **React Components**: If you are working with React components:
  - Use functional components and hooks where possible.
  - Name components using `PascalCase`.
  - Ensure that props and state are well-typed using TypeScript interfaces.
- **Commits**: Ensure commit messages are clear and concise. A good commit message describes what changes were made and why.

### Example

```typescript
// Example of an interface with a JSDoc comment
/**
 * Parameters for configuring an interaction in the InteractionDirector.
 */
interface InteractionDirectorParams {
  /**
   * Optional distance within which the interaction is active.
   */
  distance?: number;

  /**
   * The 3D component that serves as the reference for the interaction's position.
   */
  host: Component3D;

  /**
   * The key that triggers the interaction.
   */
  triggerKey: string;

  /**
   * Adjustment for interaction timing.
   */
  timingAdjustment?: number;
}
```

## Linting and Formatting

- **Linting**: We use ESLint for linting. Ensure your code passes all linting checks before submitting a pull request.
- **Formatting**: We use Prettier for code formatting. Run Prettier before committing to ensure consistent formatting.

## Reporting Bugs

If you find a bug, please open an [issue](https://github.com/numengames/numinia-oncyber/issues) and provide as much information as possible:

- Problem Description: What you expected to happen vs. what actually happened.
- Steps to Reproduce: Detail the specific steps you took to find the bug.
- Development Environment: Include details like operating system, software versions, etc.

## Suggesting New Features

If you have ideas for new features, open an [issue](https://github.com/numengames/numinia-oncyber/issues) describing your proposal. We’d love to hear your ideas and discuss how we could implement them.

## Acknowledgements

Thank you for taking the time to contribute to this project. Every contribution is greatly appreciated and helps improve the project for everyone.
