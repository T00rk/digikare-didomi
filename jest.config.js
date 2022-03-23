module.exports = {
  preset: "jest-puppeteer",
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  globalSetup: "./jest.global-setup.js",
  globalTeardown: "./jest.global-teardown.js",
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  coveragePathIgnorePatterns: [
    "src/errors/*",
    "src/middlewares/*",
    "src/models/*",
    "src/routes/*",
    "src/utils/*",
    "src/*.*"
],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
};
