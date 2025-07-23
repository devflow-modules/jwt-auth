module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 100,
      lines: 85,
      statements: 85,
    },
  },
};
