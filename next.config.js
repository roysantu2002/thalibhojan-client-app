require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  distDir: "build",

  experimental: {
    optimizeFonts: true,
    optimizeImages: true,
  },

  generateEtags: false,
  // Target must be serverless
  target: "serverless",

  webpack: (config) => {
    // config.resolve.modules.push(path.resolve("./"));
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, ".env.local"),
        systemvars: true,
      }),
    ];
    return config;
  },
});
