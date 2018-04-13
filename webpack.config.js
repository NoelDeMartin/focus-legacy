const webpack = require('webpack');
const path = require('path');
const ClearPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const inProduction = process.env.NODE_ENV === 'production';

module.exports = {

    entry: {
        app: [
            './app/assets/js/app.js',
            './app/assets/styles/app.scss',
        ],
    },

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/app-[chunkhash].js',
    },

    module: {

        rules: [

            {
                test: /\.js$/,
                use: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/,
            },

            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, 'app/assets/styles'),
                            },
                        },
                    },
                    'sass-loader',
                ],
                exclude: /node_modules/,
            },

            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: { extractCSS: true },
                    },
                    'eslint-loader',
                ],
                exclude: /node_modules/,
            },

        ],

    },

    plugins: [
        new ClearPlugin(
            [
                'public/js',
                'public/css',
                'public/manifest.json',
            ],
            {
                dist: __dirname,
                verbose: true,
                dry: false,
            }
        ),
        // use contenthash once this issue is resolved:
        // https://github.com/webpack-contrib/mini-css-extract-plugin/pull/59
        new MiniCssExtractPlugin({ filename: 'css/app-[chunkhash].css' }),
        new webpack.LoaderOptionsPlugin({ minimize: inProduction }),
        function() {
            this.plugin('afterEmit', function(compilation) {
                const assetNames = Object.getOwnPropertyNames(compilation.assets);
                require('fs').writeFileSync(
                    path.resolve(__dirname, 'public/manifest.json'),
                    JSON.stringify({
                        'css/app.css': assetNames[0],
                        'js/app.js': assetNames[1],
                    })
                );
            });
        },
    ],

    resolve: {
        extensions: ['*', '.js'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
    },

};
