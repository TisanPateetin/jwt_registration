module.exports = {
  collectCoverageFrom: [
      "src/controllers/**.ts"
      // "src/services/**.ts"
    ],
    roots: ['<rootDir>/src'],
    transform: {
      ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    moduleFileExtensions: ["ts",
      "tsx",
      "js",
      "json"
    ],
    coverageThreshold: {
      global: {
        branches: 60,
        functions: 60,
        lines: 60,
        statements: 60
      }
    },
    coverageReporters: ['json', 'lcov', 'text', 'clover']
  }
