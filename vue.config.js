const webpack = require('webpack');
const path = require('path')
const {GitRevisionPlugin} = require('git-revision-webpack-plugin');
const {defineConfig} = require('@vue/cli-service');
const {proxyAddr} = require('./config/config');
const gitRevisionPlugin = new GitRevisionPlugin();
const buildDate = JSON.stringify(new Date().toLocaleString())

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  runtimeCompiler: true,
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      gitRevisionPlugin,
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        GIT_HASH: JSON.stringify(gitRevisionPlugin.commithash()),
        BUILD_DATE: buildDate,
        /*
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
        */
      })
    ]
  },
  chainWebpack: config => {
    console.log("开发环境:",process.env.NODE_ENV);
    config.optimization.nodeEnv(false); //webpack5默认的mode配置项会自动设置process.env环境
    config.entryPoints.get('app').clear().add('./src/index.js').end()
      .resolve.alias
      .set('@src', resolve('src'))
      .set('@coms',resolve('src/components'))
      .set('@img', resolve('src/assets/images'))
      .set('@stores', resolve('src/store'))
      .set('@store', resolve('src/store/store.js'))
      .set('@apis', resolve('src/api'))
      .set('@api', resolve('src/api/requests.js'))
      .set('@con', resolve('config'))
      .set('@config', resolve('config/config.js'));
    config.module
      .rule('file-loader')
      .test(/\.(jpe?g|png|gif)$/i)
      .type('asset/resource')
      .end()
    /*
    config.plugin('html').init((Plugin, args) => {
        return new Plugin(Object.assign({}, ...args, {
          title: '沃企+管理后台',
          favicon: resolve('src/assets/favicon.ico')
        }));
      }
    );
    */
    config.plugin('html').tap(args=>{
      args[0].title = '沃企+管理后台';
      args[0].favicon = resolve('src/assets/favicon.ico');
      args[0].template = resolve('!!ejs-loader!public/index.ejs');
      return args;
    })
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: proxyAddr,
        changeOrigin:true,  // needed for virtual hosted sites
        pathRewrite: {'^/api': '/'}
      }
    }
  }
})
