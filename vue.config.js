const webpack = require('webpack');
const path = require('path')
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      /*
      new HtmlWebpackPlugin({
        title:'沃企+管理后台',
        favicon:'./src/assets/favicon.ico',
        filename:"default.html"
      }),
      */
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        GIT_HASH: JSON.stringify(gitRevisionPlugin.commithash()),
        BUILD_DATE: buildDate
      })
    ]
  },
  chainWebpack:config=>{
    config.entryPoints.get('app').clear().add('./src/index.js').end()
    .resolve.alias
      .set('@src', resolve('src'))
      .set('@img',resolve('src/assets/images'))
      .set('@store',resolve('src/store'));
    config.module
      .rule('file-loader')
      .test(/\.(jpe?g|png|gif)$/i)
      .type('asset/resource')
    .end()
    config.plugin('html').init((Plugin,args)=>{
      return new Plugin(Object.assign({},...args,{
        title:'沃企+管理后台',
        favicon:resolve('src/assets/favicon.ico')
      }));
    }
    );
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
