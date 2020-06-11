// module.exports = {
//     baseUrl: '/',
//     outputDir: 'dist', // 打包的目录
//     lintOnSave: true, // 在保存时校验格式
//     productionSourceMap: false, // 生产环境是否生成 SourceMap
//     devServer: {
//       open: true, // 启动服务后是否打开浏览器
//       host: '0.0.0.0',
//       port: 8080, // 服务端口
//       https: false,
//       hotOnly: false,
//       proxy: null, // 设置代理
//       before: app => {}
//     },
//   }

'use strict'
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = 'news PC'
const port = process.env.port || process.env.npm_config_port || 8091

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: true,
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        }
    },
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    css: {
        loaderOptions: {
          // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
          // 因为 `scss` 语法在内部也是由 sass-loader 处理的
          // 但是在配置 `data` 选项的时候
          // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
          // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
          scss: {
            prependData: `@import "~@/assets/css/mixin.scss";`
          },
          postcss: {
            'postcss-pxtorem': {
                rootValue: 16,//结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
                propList: ['*']
              }
          }
        }
      }
}