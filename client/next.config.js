const webpack = require("webpack");

const { parsed: myEnv } = require("dotenv").config({
  path: "/home/astara/Code/web/trivid/client/.env",
});

module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos"],
  },
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config;
  },
};
