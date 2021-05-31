const { makeJestConfig } = require('jest-simple-config');

module.exports = makeJestConfig({ testEnvironment: 'jsdom' });
