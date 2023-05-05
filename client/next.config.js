const webpack = require("webpack");

const { parsed: myEnv } = require("dotenv").config({
  path: "/home/astara/Code/web/trivid/client/.env",
});

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos"],
  },
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config;
  },
};
