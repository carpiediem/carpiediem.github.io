module.exports = {
  webpack: function (config, env) {
    config.module.rules.push({
      test: /\.html$/i,
      loader: 'html-loader',
    });

    return config;
  },
  jest: function (config) {
    // Bootstrapping code that's never worth unit testing.
    config.collectCoverageFrom = [
      'src/**/*.{js,jsx}',
      '!src/index.js',
      '!src/serviceWorker.js',
    ];

    return config;
  },
  // react-scripts 5's webpack-dev-server config still uses the v4
  // onBeforeSetupMiddleware/onAfterSetupMiddleware hooks, which webpack-dev-server 5
  // removed in favor of setupMiddlewares. Translate them so `npm start` keeps working
  // with the webpack-dev-server 5 override in package.json (fixes several CVEs).
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      const { onBeforeSetupMiddleware, onAfterSetupMiddleware, https, ...rest } = config;

      // webpack-dev-server 5 replaced the `https` option with `server`.
      if (https) {
        rest.server = https === true ? 'https' : { type: 'https', options: https };
      }

      rest.setupMiddlewares = (middlewares, devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }

        if (onBeforeSetupMiddleware) onBeforeSetupMiddleware(devServer);
        if (onAfterSetupMiddleware) onAfterSetupMiddleware(devServer);

        return middlewares;
      };

      return rest;
    };
  },
};
