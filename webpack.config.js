const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const project = require('./aurelia_project/aurelia.json');
const { AureliaPlugin, ModuleDependenciesPlugin } = require('aurelia-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const TerserPlugin = require('terser-webpack-plugin');
//const ClosurePlugin = require('closure-webpack-plugin');

// config helpers:
const ensureArray = (config) => config && (Array.isArray(config) ? config : [config]) || [];
const when = (condition, config, negativeConfig) =>
    condition ? ensureArray(config) : ensureArray(negativeConfig);

// primary config:
const outDir = path.resolve(__dirname, project.platform.output);
const srcDir = path.resolve(__dirname, 'src_webcomponents');
const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const baseUrl = '';

const cssRules = [
  {
    loader: 'css-loader',
    options: {
      esModule: false
    }
  }
];


module.exports = ({ production } = {}, {extractCss, analyze, tests, hmr, port, host } = {}) => ({
  resolve: {
    extensions: ['.js'],
    modules: [srcDir, 'node_modules'],

    alias: {
      // https://github.com/aurelia/dialog/issues/387
      // Uncomment next line if you had trouble to run aurelia-dialog on IE11
      // 'aurelia-dialog': path.resolve(__dirname, 'node_modules/aurelia-dialog/dist/umd/aurelia-dialog.js'),

      // https://github.com/aurelia/binding/issues/702
      // Enforce single aurelia-binding, to avoid v1/v2 duplication due to
      // out-of-date dependencies on 3rd party aurelia plugins
      'aurelia-binding': path.resolve(__dirname, 'node_modules/aurelia-binding')
    }
  },
  entry: {
    app: [
      // Uncomment next line if you need to support IE11
      // 'promise-polyfill/src/polyfill',
      'aurelia-bootstrapper'
    ]
  },
  mode: production ? 'production' : 'development',
  output: {
    path: outDir,
    publicPath: baseUrl,
    filename: 'bodylight.bundle.js',
    sourceMapFilename: 'bodylight.bundle.map'
  },
  optimization: {
    concatenateModules: false,
    runtimeChunk: false,  // separates the runtime chunk, required for long term cacheability
    // moduleIds is the replacement for HashedModuleIdsPlugin and NamedModulesPlugin deprecated in https://github.com/webpack/webpack/releases/tag/v4.16.0
    // changes module id's to use hashes be based on the relative path of the module, required for long term cacheability
    moduleIds: 'hashed',
    // Use splitChunks to breakdown the App/Aurelia bundle down into smaller chunks
    // https://webpack.js.org/plugins/split-chunks-plugin/
    minimize: production ? true : false,
    //REPLACE TERSER with CLOSURE 
    minimizer: [new TerserPlugin({
      terserOptions: {        
        mangle: { toplevel: true },
        ecma:2016,
        compress: {
          ecma:2016,
          defaults:true,
          drop_console: true, // Removes all console.* statements
          drop_debugger: true, // Removes debugger statements
          passes: 3, // Run optimizations multiple times
          pure_funcs: ["console.debug", "console.info", "console.warn"], // Removes these function calls
          reduce_funcs: true, // Inline functions aggressively
          reduce_vars: true, // Collapse variables where possible
          unsafe: true, // Enable optimizations that might break edge cases
          unsafe_math: true, // Optimize math calculations
          unsafe_comps: true, // Optimize comparisons
          unsafe_proto: true, // Optimize prototype methods
        },//,drop_console:['log', 'info']},
        keep_classnames: false,
        keep_fnames: false,
        ie8: false,
        module: true,
        nameCache: null, // or specify a name cache object
        safari10: false,
        toplevel: true,
        format: { comments: false }
      }
    })],
    /*minimizer: [
      new ClosurePlugin({mode: 'AGGRESSIVE_BUNDLE'}, {
        // compiler flags here
        //
        // for debugging help, try these:
        //
        // formatting: 'PRETTY_PRINT'
        // debug: true,
        // renaming: false
      })]
    */
  },
  performance: { hints: false },
  devServer: {
    contentBase: outDir,
    // serve index.html for all 404 (required for push-state)
    historyApiFallback: true,
    open: project.platform.open,
    hot: hmr || project.platform.hmr,
    port: port || project.platform.port,
    host: host
  },
  devtool: production ? 'nosources-source-map' : 'cheap-module-eval-source-map',
  //devtool: production ? 'eval-source-map' : 'cheap-module-eval-source-map',
  module: {
    rules: [
      // CSS required in JS/TS files should use the style-loader that auto-injects it into the website
      // only when the issuer is a .js/.ts file, so the loaders are not applied inside html templates
      {
        test: /\.css$/i,
        issuer: [{ not: [{ test: /\.html$/i }] }],
        use: extractCss ? [{
          loader: MiniCssExtractPlugin.loader
        }, ...cssRules
        ] : ['style-loader', ...cssRules]
      },
      {
        test: /\.css$/i,
        issuer: [{ test: /\.html$/i }],
        // CSS required in templates cannot be extracted safely
        // because Aurelia would try to require it again in runtime
        use: cssRules
      },
      { test: /\.html$/i, loader: 'html-loader' },
      {
        test: /\.js$/i, loader: 'babel-loader', exclude: nodeModulesDir,
        options: tests ? { sourceMap: 'inline', plugins: ['istanbul'] } : {}
      },
      // embed small images and fonts as Data Urls and larger ones as files:
      { test: /\.(png|gif|jpg|cur)$/i, loader: 'url-loader', options: { limit: 819200 } },
      { test: /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000000, mimetype: 'font/ttf'  }  },
      { test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000000, mimetype: 'application/vnd.ms-fontobject'  }  },
      { test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000000, mimetype: 'image/svg+xml'  }  },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 100000, mimetype: 'application/font-woff2' } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 100000, mimetype: 'application/font-woff' } },
      // load these fonts normally, as files:
      { test: /\.otf(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' },
      { test: /environment\.json$/i, use: [
          {loader: "app-settings-loader", options: {env: production ? 'production' : 'development' }},
        ]},
    ]
  },
  plugins: [
    ...when(!tests, new DuplicatePackageCheckerPlugin()),
    new AureliaPlugin({
      dist: 'es6',
      aureliaApp: 'webcomponents'
    }),
/*    new ProvidePlugin({
      Promise: 'bluebird'
    }),*/
    new ModuleDependenciesPlugin({
      'aurelia-testing': ['./compile-spy', './view-spy']
    }),
    // ref: https://webpack.js.org/plugins/mini-css-extract-plugin/
    ...when(extractCss, new MiniCssExtractPlugin({ // updated to match the naming conventions for the js files
      filename: production ? '[name].[contenthash].bundle.css' : '[name].[hash].bundle.css',
      chunkFilename: production ? '[name].[contenthash].chunk.css' : '[name].[hash].chunk.css'
    })),
    ...when(analyze, new BundleAnalyzerPlugin()),
    /**
     * Note that the usage of following plugin cleans the webpack output directory before build.
     * In case you want to generate any file in the output path as a part of pre-build step, this plugin will likely
     * remove those before the webpack build. In that case consider disabling the plugin, and instead use something like
     * `del` (https://www.npmjs.com/package/del), or `rimraf` (https://www.npmjs.com/package/rimraf).
     */
    new CleanWebpackPlugin(),
  ]
});
