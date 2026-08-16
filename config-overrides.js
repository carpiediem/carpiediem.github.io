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
};
