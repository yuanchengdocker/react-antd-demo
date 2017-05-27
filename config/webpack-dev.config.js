var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path'),
    rootPath = path.resolve(__dirname, '..');
    appPath = '/src/';

module.exports = {
    //小到中性的项目上，eval-source-map是一个很好的选项
    //cheap-module-eval-source-map方法构建速度更快，但是不利于调试,用在大型项目
    devtool : 'eval-source-map',
   //入口文件
    entry:  {
        bundle:rootPath + appPath +'main.js'
    },
    //输出文件目录，名称
    output: {
        path: rootPath + '/dist',
        filename: '[name].js'
    },
    //自动扩展文件后缀名，require模块可以省略不写后缀名
    resolve: {
        extensions: ['.jsx', '.js']
    },
    //加载器
    module: {
        rules: [
            {  
                //检索js,jsx文件时，启用babel-loader转义处理
                test: /\.(js|jsx)$/,
                loader:'babel-loader',
                exclude: /node_modules/
            },
            {
                //extractTextPlugin独立生成css文件
                test: /\.(styl)$/,
                loader:extractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader?modules&localIdentName=[hash:base64:5]!postcss-loader!stylus-loader'
                })
            },
            {   
                test: /\.css$/,
                loader: extractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
            },
    　　　　{
    　　　　　　test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
    　　　　　　loader: 'url-loader?limit=1024&name=images/[name].[ext]'
    　　　　},
    　　　　{
    　　　　　　test: /\.html$/,
    　　　　　　loader: 'html-withimg-loader'
    　　　　}
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
         options: {
            //自动补全css3前缀
           postcss: require('autoprefixer')
         }
        }),
        
        //自动生成html插件
        //title: 设置title的名字   
        // filename: 设置这个html的文件名   
        // template:要使用的模块的路径  
        // inject: 把模板注入到哪个标签后 'body',   
        // favicon: 给html添加一个favicon  './images/favico.ico',   
        // minify:是否压缩  true false   
        // hash:是否hash化 true false ,     
        // cache:是否缓存,   
        // showErrors:是否显示错误,  
        // xhtml:是否自动毕业标签 默认false  
        new htmlWebpackPlugin({
            template: 'html-withimg-loader!' + rootPath + appPath + 'index.html',
            filename: rootPath + '/dist/index.html',
            inject:false,
            hash:false,
            minify: {
                "removeAttributeQuotes": true,
                "removeComments": true,
                "removeEmptyAttributes": true
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     mangle: {
        //         except: ['$super', '$', 'exports', 'require', 'module', '_']
        //     },
        //     output: {
        //         comments: false,  // remove all comments
        //     },
        //     compress: {
        //         warnings: false,
        //     }
        // }),
        //提取样式插件
        new extractTextPlugin('style.css'),
        new webpack.DllReferencePlugin({
            context: rootPath,
            manifest: __dirname + '/manifest.json'
        }),
        //配合热替换作用
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendors.js' })
    ],
    //启动node服务应用配置
    //contentBase规定应用的根目录
    //inline模式下支持热启动
    //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    devServer:{
        contentBase: rootPath + '/dist',
        inline: true,
        hot:true,
        historyApiFallback: true
    }
}