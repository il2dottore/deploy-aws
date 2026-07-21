const path = require('path');

// Must be executed with `scripts/build.js`
const appName = process.env.APP_NAME || 'auth';

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
            configFile: path.resolve(
              __dirname,
              `apps/${appName}/tsconfig.app.json`,
            ),
            transpileOnly: true,
          },
        },
      },
    ],
  },

  target: 'node',
  mode: 'production',
};
