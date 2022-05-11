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
    .resolve.alias.set('@src', resolve('src')).set('@img',resolve('src/assets/images'));
    config.module
      .rule('file-loader')
      .test(/\.(jpe?g|png|gif)$/i)
      .type('asset/resource')
    .end()
  },
  css:{
    loaderOptions:{
      less:{
        lessOptions:{
          javascriptEnabled: true
        }
      }
    }
  }
})
