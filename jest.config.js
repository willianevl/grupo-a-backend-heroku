module.exports = {
  // files that will enter the coverage statistic
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  // folder with reports
  coverageDirectory: "coverage",
  // ignored folders (coverage)
  coveragePathIgnorePatterns: [
    "\\\\node_modules\\\\",
    "<rootDir>/src/core/infra/data/database/migrations",
  ],
  // tests base folder
  roots: ["<rootDir>/tests"],
  // where it will be run
  testEnvironment: "node",
  // translate tests to JavaScript
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
};