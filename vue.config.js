const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,

  chainWebpack: (config) => {
    // 配置 svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(/\.svg$/)
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(path.resolve("lib/assets/icon/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
    config.module
      .rule('js')
      .include.add(path.resolve(__dirname, 'packages')).end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
      .end();
    // 配置忽略特定的文件夹或文件
    config.module.rule('exclude-public')
      .exclude
      .add(/public/)
      .add(/scripts/)
      .add(/docs/)
      .add(/examples/)
      .add(/lib/)
      .end();
  },
  configureWebpack: {
    entry: './examples/main.ts', // 测试文件路径
    // entry: './lib/index.ts', // 打包文件路径
    output: {
      library: 'index', // 全局变量名
      libraryTarget: 'umd', // 打包格式
      umdNamedDefine: true, // 为 UMD 模块提供一个名称
    },
    externals: {
      axios: "axios",
    }
  }
});
