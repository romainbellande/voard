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

  config.module.rules.push({
    test: /\.vue$/,
    loader: 'storybook-addon-vue-info/loader',
    enforce: 'post',
  });

  config.plugins.push(new VuetifyLoaderPlugin());
  return config;
};
