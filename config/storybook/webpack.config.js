const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.md$/,
    use: [
      {
        loader: 'html-loader',
      },
      {
        loader: 'markdown-loader',
        options: {
          /* your options here */
        },
      },
    ],
  });
  config.plugins.push(new VuetifyLoaderPlugin());
  return config;
};
