require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
//webpack.functions.js
const nodeExternals = require("webpack-node-externals");

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  webpack5: true,
  distDir: "build",
  externals: [nodeExternals()],
  experimental: {
    optimizeFonts: true,
    optimizeImages: true,
  },

  generateEtags: false,
  target: "serverless",

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },
});
