'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    //build文件夹下是有个dev-serve.js文件的
    //新版模板中build下没有这个文件
    //只需要在config文件夹下的index.js文件中找到proxyTable关键字 配置反向代理实现跨域
    proxyTable: {
      '/api/getDiscList': {
        target: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://y.qq.com/';
          req.headers.host = 'c.y.qq.com';
        },
        secure: false,
        changeOrigin:true,
        pathRewrite: {
          '^/api/getDiscList': ''
        }
      },
      '/api/getSongList': {
        target: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://y.qq.com/';
          req.headers.host = 'c.y.qq.com';
        },
        secure: false,
        changeOrigin:true,
        pathRewrite: {
          '^/api/getSongList': ''
        }
      },
      '/api/lyric': {
        target: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://y.qq.com/';
          req.headers.host = 'c.y.qq.com';
        },
        secure: false,
        changeOrigin:true,
        pathRewrite: {
          '^/api/lyric': ''
        }
      },
    },
//注意上面的写法

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
