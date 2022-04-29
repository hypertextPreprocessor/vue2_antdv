
const { defineConfig } = require('@vue/cli-service')


const path = require('path')
const webpack = require('webpack')
const {GitRevisionPlugin} = require('git-revision-webpack-plugin')
const GitRevision = new GitRevisionPlugin()
const buildDate = JSON.stringify(new Date().toLocaleString())
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const { VueLoaderPlugin } = require('vue-loader')
const ESLintPlugin = require('eslint-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, dir)
}

// check Git
function getGitHash () {
  try {
    return GitRevision.version()
  } catch (e) {
    console.log(e);
  }
  return 'unknown'
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js'
  ]
}

// vue.config.js
const vueConfig = {
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      //new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        GIT_HASH: JSON.stringify(getGitHash()),
        BUILD_DATE: buildDate
      }),
      new ESLintPlugin({
        //eslintPath:'src',
        exclude:"node_modules",
        lintDirtyModulesOnly:true
      }),
      new VueLoaderPlugin()
    ],
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {}
  },

  chainWebpack: config => {
    config.resolve.alias.set('@$', resolve('src'))
    config.module
      .rule('svg').clear()
        .test(/\.svg/)
          .oneOf('inline')
            .resourceQuery(/inline/)
            .type('asset/inline')
            .end()
            //.end()
          .oneOf('external')
            //.test(/\.(png|jpe?g|gif)$/i)
            .resourceQuery(/external/)
            .type('asset/resource')
            .end()
            //.end()
            .clear()
      .rule('vue')
        //.before('complie')
        .test(/\.vue$/)
        .use('vue-loader')
        .loader('vue-loader')
        .end()
    // if prod is on
    // assets require on cdn
    if (isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },

  css: {
    loaderOptions: {
      css:{
        url:true
      },
      less: {
        lessOptions:{
          javascriptEnabled: true,
          modifyVars: {
            // less vars，customize ant design theme
  
            // 'primary-color': '#F5222D',
            // 'link-color': '#F5222D',
            'border-radius-base': '2px'
          }
        },

      }
    }
  },

  devServer: {
    // development server port 8000
    hot:true,
    open:true,
    port: 8000,
    client:{
      overlay:{
        warnings: true,
        errors: true
      }
    },
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    // proxy: {
    //   '/api': {
    //     target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
    //     ws: false,
    //     changeOrigin: true
    //   }
    // }
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true)
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

//module.exports = vueConfig


module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir:'assets/[name].[hash:8].[ext]',
  configureWebpack:vueConfig.configureWebpack,
  chainWebpack:vueConfig.chainWebpack,
  css:vueConfig.css,
  devServer:vueConfig.devServer,
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',
  transpileDependencies: []
})