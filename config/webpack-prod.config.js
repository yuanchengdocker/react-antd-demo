var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path'),
    rootPath = path.resolve(__dirname, '..');
    appPath = '/src/';

module.exports = {
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
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require', 'module', '_']
            },
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false,
            }
        }),
        new extractTextPlugin('style.css'),
        new webpack.DllReferencePlugin({
            context: rootPath,
            manifest: __dirname + '/manifest.json',
        })
    ]
}