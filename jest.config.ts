const customJestConfig = {
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
    "^@graphql/core/(.*)$": "<rootDir>/src/core/$1",
  },
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // The important part right here
  },
};

export default customJestConfig;
