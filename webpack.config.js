const webpack = require('webpack');
const path    = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const sass = require('node-sass');
const readFileSync = require('fs').readFileSync;

//const chunk_upload_path = './node_modules/@mediagoom/chunk-upload';

const chunk_upload_path = '../chunk-upload';

function svg_inline(value)
{
    //const val = value.dartValue.a;
    const val = value.getValue();

    const svg_path = path.resolve( chunk_upload_path + '/assets', val);
   
    const content = readFileSync(svg_path);

    return new sass.types.String('url("data:image/svg+xml;base64,' + content.toString('base64') + '")');
}


//var transform_imports = require('babel-plugin-transform-imports')

function babel_plugins()
{
   
    let plugins = ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import'];

    /*
    if (process.env.NODE_ENV === 'production'
    ) 
    {
        plugins = plugins.concat([ '@babel/plugin-transform-async-to-generator'
            , '@babel/plugin-syntax-async-functions']);
    }*/

    /*
    if(process.env.NODE_ENV != 'test')
    {
        plugins = plugins.concat([
            [ 'transform-imports', {
                'vuetify': {
                    'transform': 'vuetify/es5/components/${member}'
                    ,'preventFullImport': true
                }
            }]
        ]);
    }
    */

    

    //console.log(plugins);

    return plugins;
}

let externals = {
    dashjs: 'dashjs'
};

if(process.env.NODE_ENV === 'test')
{
    externals = [nodeExternals()];
}

module.exports = {
    context: __dirname
    , externals /*: {
        dashjs: 'dashjs'
        
    }*/
    , optimization: {
        splitChunks: {
            cacheGroups: {
                mediagoom:{
                    test: /[\\/]node_modules[\\/]@mediagoom[\\/]/
                    , name: 'mediagoom'
                    , chunks: 'all'
                    , priority: 10
                }

                , vendors: {
                    test: /[\\/]node_modules[\\/]/
                    , name: 'vendors'
                    , chunks: 'all'
                }
            }
        }
    }
    // the main entry of our app
    , entry: { main: './src/main.js' }
    //, entry: ['babel-polyfill', './src/index.js']
    //, entry: ['babel-polyfill', { main: './src/index.js' }]
    , output: {
        path: __dirname + '/bin/'
        , filename: 'bundle.js'
        , chunkFilename: '[name].bundle.js'
        , publicPath: '/script/'
        //, devtoolModuleFilenameTemplate: '[absolute-resource-path]'
        //, devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    }
    , resolve: {
        extensions: ['.js', '.vue']
        , alias: {
            //'vue$': 'vue/dist/vue.esm.js'
            '@': 'src'
        }
    }
    , module: {
        rules: [
            /*{
                enforce: 'pre'
                , test: /\.(js|vue)$/
                , loader: 'eslint-loader'
                , exclude: /node_modules/
            }
            // process *.vue files using vue-loader
            ,*/ { test: /\.vue$/
                , loader: 'vue-loader' 
                , options: {
                    loaders: {
                        /*
                        scss: [
                            'vue-style-loader'
                            , 'css-loader'
                            //'postcss-loader',
                            , 'sass-loader'
                            , {
                                loader: 'sass-resources-loader'
                                , options: {
                                    resources: path.resolve(__dirname, './src/style/_variables.scss') // for example
                                    //, path.resolve(__dirname, './node_modules/@mediagoom/chunk-upload/src/UI/style.scss')
                                    
                                },
                            }
                        ]
                        , sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                        ,
                        js: {
                            loader: 'babel-loader'
                            , options: {
                                //presets: [ '@babel/preset-env']
                                presets: ['@babel/env', { 
                                    modules: false 
                                    , 'targets': {
                                        'chrome': '58'
                                        ,'ie': '11'
                                    }
                                    , forceAllTransforms: true
                                    , useBuiltIns: 'usage'
                                }]
                                , plugins: babel_plugins()
                            }
                        }
                        */
                    }
                }
            }
            // process *.js files using babel-loader
            // the exclude pattern is important so that we don't
            // apply babel transform to all the dependencies!
            ,{
                test: /\.js$/
                , exclude: /node_modules[\/\\](?!(superagent|ANOTHER-ONE)[\/\\]).*/
                ///node_modules\/(?!(vuetify|ANOTHER-ONE)\/).*
                //
                , loader: 'babel-loader'
                , options: {
                    presets: [ ['@babel/env', { 
                        modules: 'commonjs'
                        , 'targets': {
                            'chrome': '58'
                            ,'ie': '11'
                        }
                        , forceAllTransforms: true
                        //, useBuiltIns: 'usage'
                    } ]
                    ]
                    , plugins: babel_plugins()
                }
            }
            // this will apply to both plain `.scss` files
            // AND `<style lang="scss">` blocks in `.vue` files
            ,{
                test: /\.scss$/
                ,use: [
                    'vue-style-loader'
                    ,'css-loader'
                    , { loader: 'sass-loader'
                        , options: {
                            functions: {
                                'svg($value1)' : svg_inline
                            }
                        }
                    }
                    , { loader: 'sass-resources-loader'
                        , options: {
                            sourceMap: true
                            ,resources: [
                                path.resolve(__dirname, './src/style/_variables.scss') 
                                , path.resolve(__dirname, './node_modules/@mediagoom/chunk-upload/src/UI/style.scss')
                                ,]
                        }
                    }
                ]
            }
            ,{
                test: /\.(png|jpg|gif|svg)$/
                ,use: [
                    {
                        loader: 'file-loader'
                        ,options: {}
                    }
                ]
            }
            /*,{
                test: /\.css$/
                , use: [ 'style-loader', 'css-loader' ]
            }*/
            
        ]
    }
    , plugins: [
        /*new HtmlWebpackPlugin({
            title: 'node-play-ui'
            ,filename: '../index.html'
        })
        ,*/ new VueLoaderPlugin()
        
        /*
        , new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
            , minChunks: Infinity
        }),
        */

    ]
    //, devtool: '#eval-source-map'
    , devtool: 'source-map'

    , devServer: {
        proxy: {
            '/api': 'http://localhost:3000'
            , '/play': 'http://localhost:3000'
            , '/upload': 'http://localhost:3000' 
        }
        , index: 'index.html'
        , overlay: {
            warnings: false
            , errors: true
        }
        //, publicPath: '/script/'
    }
};

if (process.env.NODE_ENV != 'test') {
    //module.exports.plugins = (module.exports.plugins || []).concat([
        
    //]);
}

if (process.env.NODE_ENV === 'production') {

    //module.exports.entry = ['babel-polyfill', './src/index.js'];
    //module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })

        /*, new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
            ,compress: {
                warnings: false
            }
            , mangle: {
                except: ['Service', 'business_object', 'Axiom', 'auth', 'data'], // blacklist your service from being mangled
            }
        })*/
        , new webpack.LoaderOptionsPlugin({
            minimize: true
        })
        
    ]);
}

// test specific setups
if (process.env.NODE_ENV === 'test') {
    module.exports.externals = [require('webpack-node-externals')()];
    module.exports.devtool = 'inline-cheap-module-source-map';
    //module.exports.devtool = "source-map";
}