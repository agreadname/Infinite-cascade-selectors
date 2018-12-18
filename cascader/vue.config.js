const path = require('path')
const debug = process.env.NODE_ENV !== 'production'
const fs = require('fs')
module.exports = {
   
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: { // 配置跨域
            '/api': {
                target: 'http://zkcj.test.dc-it.cn',
                ws: true,
                changOrigin: true,
                /*
                pathRewrite: {
                    '^/api': ''
                }
                */
            }
        },
        before: app => { }
    },
    configureWebpack: {
      resolve: {
        extensions: ['.js', '.vue', '.json'],
      },
    }
    /*
    ,
    css: {
      loaderOptions: {
        sass: {
          data: fs.readFileSync('src/style/initial.scss', 'utf-8')
        }
      }
    }*/
}