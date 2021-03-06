module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupTestFrameworkScriptFile: './jest.setup.js',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^vuetify/lib$': 'vuetify',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '**/src/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
  testURL: 'http://localhost/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{vue}', '!**/node_modules/**', '!<rootDir>/dist/**',
    '!<rootDir>/src/plugins/**', '!<rootDir>/src/**/*.(test|spec).js',
  ],
  coverageReporters: ['lcov', 'text-summary'],
};
