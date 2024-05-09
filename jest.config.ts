import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    "jest-fetch-mock/setupJest"
  ],
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
};

export default config;
