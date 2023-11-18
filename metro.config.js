// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
module.exports = getDefaultConfig(__dirname);

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetsExts.push('cjs');

module.exports = defaultConfig;
