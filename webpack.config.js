const webpack = require('webpack');
const path = require('path');
const ClearPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const inProduction = process.env.NODE_ENV === 'production';

const scssLoaders = [
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
];

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
                test: /\.ts$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                        },
                    },
                    'tslint-loader',
                ],
                exclude: /node_modules/,
            },

            {
                test: /\.scss$/,
                use: scssLoaders,
                exclude: /node_modules/,
            },

            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                scss: scssLoaders,
                            },
                        },
                    },
                    'eslint-loader',
                ],
                exclude: /node_modules/,
            },

            {
                test: /\.(ttf|woff|woff2|eot)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    outputPath: '/',
                },
            },

        ],

    },

    plugins: [
        new ClearPlugin(
            [
                'public/js',
                'public/css',
                'public/fonts',
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
                const manifest = {};
                for (let name of assetNames) {
                    if (name.startsWith('css/app')) {
                        manifest['css/app.css'] = name;
                    } else if (name.startsWith('js/app')) {
                        manifest['js/app.js'] = name;
                    }
                }
                require('fs').writeFileSync(
                    path.resolve(__dirname, 'public/manifest.json'),
                    JSON.stringify(manifest)
                );
            });
        },
    ],

    resolve: {
        extensions: ['*', '.js', '.ts'],
        alias: {
            '@': path.resolve(__dirname, 'app/assets/js'),
            'vue$': 'vue/dist/vue.esm.js',
        },
    },

};
