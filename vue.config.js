const Timestamp = new Date().getTime()
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
process.env.VUE_APP_Version = 'v20200516'
module.exports = {
  publicPath: '/media',
  outputDir: process.env.outputDir,
  productionSourceMap: false,
  chainWebpack: config => {
    // ============压缩图片 start============
    if (process.env.NODE_ENV === 'production') {
      // config.module
      //   .rule('images')
      //   .use('image-webpack-loader')
      //   .loader('image-webpack-loader')
      //   .options({ bypassOnDebug: true })
      //   .end()
      // ============压缩图片 end============
      config.plugins.delete('prefetch') // vue-cli3.0   加上这行才能按需加载  移除 prefetch 插件
      // 移除 preload 插件
      config.plugins.delete('preload')
      // 压缩代码
      config.optimization.minimize(true)
      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all'
      })
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // webpack 配置
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.map$|\.css$/,
          // 超过4kb压缩
          threshold: 4096
        })
      )
      config.plugins.push(
        new TerserPlugin({
          terserOptions: {
            // 自动删除console
            compress: {
              // warnings: false, // 若打包错误，则注释这行
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            }
          },
          cache: true,
          sourceMap: false,
          parallel: true
        })
      )
      config.output.filename = `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
      config.output.chunkFilename = `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
    } else {
      config.devtool = 'source-map'
    }
  },
  lintOnSave: false,
  devServer: {
    proxy: {
      '/media/login/auth': {
        target: 'http://192.168.18.12:9092',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/media/login/auth': ''
        }
      }
    }
  }
}
