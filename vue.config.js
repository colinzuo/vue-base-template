'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || 8088

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/',

  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,

  devServer: {
    port: port,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/zhiyoufy-api': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true
      }
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },

  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
            args[0].title = "Vue Base Template";
            return args;
        })
  },

  transpileDependencies: [
    'vuetify'
  ]
}
