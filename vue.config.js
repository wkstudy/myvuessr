const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const nodeExternals = require('webpack-node-externals');

const config = {
  client: {
    entry: './src/entry-client.js',
    target: 'web',
    plugins: [new VueSSRClientPlugin()],
    outputDir: 'dist-client',
    output: {
      libraryTarget: undefined,
    },
    optimization: {
      splitChunks: {
        name: 'manifest',
        minChunks: Infinity,
      },
    },
  },
  server: {
    entry: './src/entry-server.js',
    target: 'node',
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    output: {
      libraryTarget: 'commonjs2',
    },
    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 默认文件名为 `vue-ssr-server-bundle.json`
    plugins: [new VueSSRServerPlugin()],
    outputDir: 'dist-server',
    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，
    // 并生成较小的 bundle 文件。
    externals: nodeExternals({
      // 不要外置化 webpack 需要处理的依赖模块。
      // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
      // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
      allowlist: /\.css$/,
    }),
    optimization: {},
  },
};
module.exports = {
  // transpileDependencies: true,
  outputDir: config[process.env.MODE].outputDir,

  configureWebpack: () => ({
    entry: config[process.env.MODE].entry,
    target: config[process.env.MODE].target,
    output: {
      ...config[process.env.MODE].output,
    },
    // 对 bundle renderer 提供 source map 支持
    devtool: 'source-map',
    plugins: config[process.env.MODE].plugins,
    externals: config[process.env.MODE].externals,
    optimization: config[process.env.MODE].optimization,
  }),
};
