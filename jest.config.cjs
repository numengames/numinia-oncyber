module.exports = {
  verbose: true,
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'node', // Simulate browser environment for React
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS modules
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Setup file for Jest
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore node_modules and dist
  coverageDirectory: 'coverage', // Output coverage reports to coverage folder
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts', // Exclude type declaration files
  ],
};