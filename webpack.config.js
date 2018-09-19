﻿const webpack = require('webpack');
const path    = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
//var transform_imports = require('babel-plugin-transform-imports')

function babel_plugins()
{
   
    let plugins = ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import'];

    if (process.env.NODE_ENV === 'production'
    ) 
    {
        plugins = plugins.concat([ '@babel/plugin-transform-async-to-generator'
            , '@babel/plugin-syntax-async-functions']);
    }

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

module.exports = {
    context: __dirname
    , externals: {
        dashjs: 'dashjs'
      }
    , optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
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
        , filename: 'build.js'
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
                        scss: [
                            'vue-style-loader'
                            , 'css-loader'
                            //'postcss-loader',
                            , 'sass-loader'
                            , {
                                loader: 'sass-resources-loader'
                                , options: {
                                    //resources: path.resolve(__dirname, './src/style/_variables.scss'), // for example
                                },
                            }
                        ]
                        , sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                        , js: {
                            loader: 'babel-loader'
                            , options: {
                                presets: [ '@babel/preset-env']
                                , plugins: babel_plugins()
                            }
                        }
                    }
                }
            }
            // process *.js files using babel-loader
            // the exclude pattern is important so that we don't
            // apply babel transform to all the dependencies!
            ,{
                test: /\.js$/
                , exclude:  /node_modules/
                ///node_modules\/(?!(vuetify|ANOTHER-ONE)\/).*
                , loader: 'babel-loader'
                , options: {
                    presets: ['@babel/preset-env']
                    , plugins: babel_plugins()
                }
            }
            // this will apply to both plain `.scss` files
            // AND `<style lang="scss">` blocks in `.vue` files
            ,{
                test: /\.scss$/,
                use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader'
                ]
            }
            ,{
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {}
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
        new VueLoaderPlugin()
        /*
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
            , filename: 'vendor.js'
            , minChunks: function (module) {
                //if(module.resource && (/vuetify/).test(module.resource)) {
                //    return false;
                //}
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        })
*/
        /*
        , new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
            , minChunks: Infinity
        }),
        */

    ]
    //, devtool: '#eval-source-map'
    , devtool: 'source-map'
};

if (process.env.NODE_ENV != 'test') {
    //module.exports.plugins = (module.exports.plugins || []).concat([
        
    //]);
}

if (process.env.NODE_ENV === 'production') {

    module.exports.entry = ['babel-polyfill', './src/index.js'];
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
        , new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
            ,compress: {
                warnings: false
            }
            , mangle: {
                except: ['Service', 'business_object', 'Axiom', 'auth', 'data'], // blacklist your service from being mangled
            }
        })
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