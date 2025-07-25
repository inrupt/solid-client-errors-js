// MIT License
//
// Copyright (c) Inrupt
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//

import type { Config } from "jest";

type ArrayElement<MyArray> = MyArray extends Array<infer T> ? T : never;

const baseConfig: ArrayElement<NonNullable<Config["projects"]>> = {
  coveragePathIgnorePatterns: [".*\\.mock\\.ts"],
  modulePathIgnorePatterns: ["dist/", "<rootDir>/examples/"],
  // Setup required because of missing globals in JSDom
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testRegex: "/src/.*\\.test\\.ts$",
  clearMocks: true,
  injectGlobals: false,
  preset: "ts-jest",
};

export default {
  collectCoverage: true,
  coverageReporters: process.env.CI ? ["text", "lcov"] : ["text"],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  projects: [
    {
      ...baseConfig,
      displayName: "browser",
      testEnvironment: "jsdom",
      testPathIgnorePatterns: ["e2e"],
    },
    {
      ...baseConfig,
      displayName: "node",
      testEnvironment: "node",
      testPathIgnorePatterns: ["e2e"],
    },
    {
      ...baseConfig,
      displayName: "e2e-node",
      testEnvironment: "node",
      testRegex: "e2e/node/.*.test.ts",
      setupFiles: ["<rootDir>/e2e/node/jest.setup.ts"],
      // don't load the polyfills
      setupFilesAfterEnv: [],
      slowTestThreshold: 30,
    },
  ],
} as Config;
