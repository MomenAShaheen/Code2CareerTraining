// const { createDefaultPreset } = require("ts-jest");

// const tsJestTransformCfg = createDefaultPreset().transform;

// /** @type {import("jest").Config} **/
// module.exports = {
//   testEnvironment: "node",
//   transform: {
//     ...tsJestTransformCfg,
//   },
//   coverageDirectory: "./coverage",
// };

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  // Transform all necessary files
  transform: {
    "^.+\\.(t|j)sx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
        useESM: true,
      },
    ],
  },

  // Critical: Don't ignore faker and other ES modules
  transformIgnorePatterns: [
    "node_modules/(?!(@faker-js/faker|other-esm-packages)/)",
  ],

  // Enable ES module support
  extensionsToTreatAsEsm: [".ts"],

  moduleNameMapping: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  moduleFileExtensions: ["ts", "js", "json", "node"],
  roots: ["<rootDir>/src"],
};
