const path = require('path');

const root = (...parts) => path.resolve(__dirname, ...parts);

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@app/common': root('libs/common/src'),
      '@app/config': root('libs/config/src'),
      '@app/database': root('libs/database/src'),
      '@app/redis': root('libs/redis/src'),
      '@app/auth': root('libs/auth/src'),
      '@app/storage': root('libs/storage/src'),
    },
  },

  // Avoid breaking Swagger
  optimization: {
    minimize: false,
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },

  target: 'node',
  mode: 'production',
};
