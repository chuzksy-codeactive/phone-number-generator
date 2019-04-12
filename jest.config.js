module.exports = {
  "verbose": true,
  "collectCoverage": true,
  "collectCoverageFrom": [
    "server/**/*.{js,jsx}",
    "!**/node_modules/**",
    "!server/dist/**",
    "!server/bin/**"
  ],
  "coverageReporters": ["json", "lcov", "text", "clover"]
};