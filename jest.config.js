module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'client/**/*.{js,jsx}',
    'server/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!server/dist/**',
    '!server/bin/**',
    '!client/config/**',
    '!client/dist/**',
    '!client/src/reducers/rootReducer.js',
    '!client/src/routes/**',
    '!client/src/index.js',
    '!client/src/store/configureStore.js',
    '!server/index.js'
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest'
  },
};
