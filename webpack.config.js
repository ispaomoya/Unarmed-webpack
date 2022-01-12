const { CleanWebpackPlugin } = require('clean-webpack-plugin')//我们拿到这个类
//这里导出本身是一个类，不是对象，所以不用解构，这是人家的规范
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { DefinePlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader/lib/index')
// const { VueLoaderPlugin } = require('vue-loader/dist/index')

module.exports = {
    target: 'web',//这个就是被什么打包，运行在web中就是web，如果是node.js那就写node
    // mode:'development',//模式，可以看打包后的代码
    // devtool:'source-map',//设置成source-map,eval
    entry: "./src/index.js",//入口
    output: {//出口
        //这里要绝对路径
        path: path.resolve(__dirname,"./dist"),
        //解决 Automatic publicPath is not supported in this browser 错误
        publicPath:'./',//默认路径
        filename:'./js/main.js'//打包后的文件名
    },
    devServer: {
        // contentBae:'./public',//白名单
        hot:true//模块热替换开起来
    },
    module:{
        //规则处理
        rules: [
            {
                test: /\.css$/,//正则
                //1,2,3都一样，写法不一样而已
                // loader: "css-loader"//-----------1
                //这里有个问题，loader加载顺序是从后往前加载的
                //但是css要先加载再加载style，不然会报错
                use:[
                    // {loader:'css-loader'}//------------2
                    'style-loader',
                    'css-loader',//----------3
                    {
                        loader:'postcss-loader',//loader
                        options:{//配置信息
                            postcssOptions: {
                                plugins: [//插件
                                    // require('autoprefixer')//引入
                                    'postcss-preset-env'
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            // {
            //     test: /\.(jpe?g|png|gif|svg)$/,
            //     use:{
            //         loader:'file-loader',
            //         options: {
            //             // publicPath:'./dist/img/',
            //             //文件路径和自定义文件名
            //             // outputPath:'img',//打包后会放在dist/img/文件夹中
            //             //打包后的文件名name,hash是不重复16进制，ext动态后缀
            //             // name: '[name]-[hash:6].[ext]',
            //           },
            //         }
            // },
            // {
            //     test: /\.(png|jpg|gif)$/i,
            //     use: [
            //       {
            //         loader: 'url-loader',
            //         options: {
            //           limit: 8192
            //         }
            //       }
            //     ]
            //   }
            //webpack5的用法，直接用webpack5，连file-loard/url-loader都不用安装
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                // type:"asset/resource",//类型
                type:"asset",//类型
                generator:{//生成
                    //这里的扩展名不需要包含点“.”
                    filename:"img/[name]_[hash:6][ext]"
                },
                parser: {
                    dataUrlCondition: {//数据url的条件
                        maxSize: 100 * 1024//最大，这里是webpack5写法
                    }
                }
            },
            // {
            //     test:/\.m?js$/,
            //     use:{
            //         loader:'babel-loader',
            //         options:{//配置信息
            //             // plugins:[
            //             //     '@babel/plugin-transform-block-scoping',//const转var
            //             //     '@babel/plugin-transform-arrow-functions'//箭头转fun
            //             // ]
            //             presets:[//预设
            //                 '@babel/preset-env',
            //                 //如果这个插件有参数的时候可以这样写
            //                 // {'@babel/preset-env':[]}
            //             ]
            //         }
            //     }
            // }
            {
                test:/\.m?js$/,
                // use:'babel-loader'
                loader:'babel-loader'
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            }
        ]
    },
    plugins:[//这里是数组
        //里面放一个个插件对象
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'徒手搭建webpack',
            template:'./public/index.html'
        }),
        new DefinePlugin({
            BASE_URL:''//这个值自己定义啦我这里就不写了，dddd
        }),
        // new CopyWebpackPlugin({
        //     patterns:[//匹配
        //         {
        //             from:'public',//从哪里复制
        //             //复制到哪里//to一般是不写的，默认在你写的dist中找，
        //             // to:'./abc',//复制到当前的abc文件夹中
        //             globOptions:{//忽略
        //                 ignore:[//忽略当前文件夹的所有东西
        //                     '**/index.html'
        //                 ]
        //             }
        //         }
        //     ]
        // })
        new VueLoaderPlugin()//帮助vueloader做一些事情
    ]
}