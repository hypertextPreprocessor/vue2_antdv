const webpack = require('webpack');
const path = require('path')
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const { defineConfig } = require('@vue/cli-service')
const gitRevisionPlugin = new GitRevisionPlugin();
const buildDate = JSON.stringify(new Date().toLocaleString())
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  runtimeCompiler:true,
  transpileDependencies: true,
  configureWebpack:{
    plugins:[
      gitRevisionPlugin,
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        GIT_HASH: JSON.stringify(gitRevisionPlugin.commithash()),
        BUILD_DATE: buildDate
      })
    ]
  },
  chainWebpack:config=>{
    config.entryPoints.get('app').clear().add('./src/index.js').end()
    .resolve.alias.set('@src', resolve('src'));
    config.module
      .rule('complie')
      .test(/.jsx?$/)
      .use('babel-loader')
      .options({
        presets:['@babel/preset-env']
      })
    .end()
  }
})
