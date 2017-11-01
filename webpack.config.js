var webpack = require("webpack");
// var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({minimize: true});
// var CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': "jquery"});
module.exports = {
    entry: './src/js/index.js',
    output: {
        path: __dirname + './static/',
        publicPath: "http://localhost:8080/static/",
        filename: "index.js"
    },
    module: {
        rules: [
            {test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"]},
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: [
                        require.resolve('babel-preset-es2015'),
                        require.resolve('babel-preset-react'),
                        require.resolve('babel-preset-stage-0')
                    ]
                }
            },
            {test: /\.(jpg|png)$/, loader: "url-loader"},
            {
            // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
            test: /\.(woff|woff2|svg|eot|ttf|otf)\??.*$/,
            loader: 'file?name=./static/fonts/[name].[ext]',
            }
        ]
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
        inline: true
    },
    plugins: [
        providePlugin,
        new webpack.NoEmitOnErrorsPlugin()
    ]
}